import { getAll } from "../services/blogs";

const Blogs = () => {
  const blogs = getAll();

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <span>
              {blog.title} by <strong>{blog.author}</strong>
            </span>
            <ul>
              <li>
                <span>{blog.likes} likes</span>
              </li>
              <li>
                <a href={blog.url}>Read more</a>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
