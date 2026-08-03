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
