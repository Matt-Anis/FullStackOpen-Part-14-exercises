import { getAll, getByKeyword } from "../services/blogs";
import { searchBlogs } from "../actions/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = filter ? getByKeyword(filter) : getAll();
  [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        <form action={searchBlogs}>
          <input type="text" name="keyword" placeholder="Search blogs..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <span>
                {blog.title} by <strong>{blog.author}</strong>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
