import { createBlog } from "@/app/actions/blogs";

const NewBlog = () => {
  return (
    <div>
      <h1>Create new</h1>
      <form action={createBlog}>
        <div>
          title: <input name="title" />
        </div>
        <div>
          <div>
            author: <input name="author" />
          </div>
          <div>
            url: <input name="url" />
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
