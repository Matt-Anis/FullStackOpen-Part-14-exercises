import { getById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import { likeBlog } from "@/app/actions/blogs";
import Link from "next/link";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="mx-10 my-6 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-bold font-mono capitalize text-zinc-100">
          {blog.title}
        </h2>
        <p className="text-zinc-400 text-sm">by {blog.author}</p>
      </div>

      <div className="flex flex-col gap-3 p-6 rounded-xl border border-zinc-700">
        <p className="text-zinc-300 w-full">
          URL:{" "}
          <a
            href={blog.url}
            className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2 transition-colors"
          >
            {blog.url}
          </a>
        </p>
        <p className="text-zinc-300">♥ {blog.likes} likes</p>
        <p className="text-zinc-300">
          Created by:{" "}
          <Link
            href={`/users/${blog.user.username}`}
            className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2 transition-colors"
          >
            {blog.user.username}
          </Link>
        </p>
      </div>

      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-zinc-50 text-zinc-900"
        >
          Like
        </button>
      </form>
    </div>
  );
};

export default BlogPage;
