"use client";

import { createBlog } from "@/app/actions/blogs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const NewBlog = () => {
  const { status } = useSession();

  if (status !== "authenticated") {
    redirect("/login");
  }

  return (
    <div>
      <h1>Create new</h1>
      <form action={createBlog}>
        <div>
          title: <input name="title" required minLength={5} />
        </div>
        <div>
          <div>
            author: <input name="author" required minLength={5} />
          </div>
          <div>
            url: <input name="url" required minLength={5} />
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
