import { getAll } from "../services/blogs";
import Link from "next/link";

const Blogs = () => {
  const blogs = getAll().sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>Blogs</h1>
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
