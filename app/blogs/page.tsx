import { getAll, getByKeyword } from "../services/blogs";
import { searchBlogs } from "../actions/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = filter ? await getByKeyword(filter) : await getAll();
  [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full mb-5 items-center">
        <form action={searchBlogs} className="flex gap-1 w-full">
          <input
            type="text"
            name="keyword"
            data-testid="filter-input"
            placeholder="Search blogs..."
            className="w-full py-2 px-4 text-sm text-zinc-50 placeholder:text-zinc-300 border border-zinc-50 rounded-full"
          />
          <button
            type="submit"
            data-testid="search-button"
            className="py-2 px-4 bg-zinc-100 text-zinc-900 rounded-full"
          >
            Search
          </button>
        </form>
      </div>
      <ul data-testid="blogs-list">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <div className="w-full mb-2 px-6 py-4 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-colors">
                <div className="w-full flex flex-col gap-2">
                  <p className="text-xl capitalize font-semibold text-zinc-100">
                    {blog.title}
                  </p>
                  <p className="text-sm text-zinc-400">by {blog.author}</p>
                  <p className="text-sm text-zinc-500">♥ {blog.likes} likes</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
