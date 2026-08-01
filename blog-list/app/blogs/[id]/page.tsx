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
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>Likes: {blog.likes}</p>
      <p>
        created by:{" "}
        <Link href={`/users/${blog.user.username}`}>{blog.user.username}</Link>
      </p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  );
};

export default BlogPage;
