"use client";

import { createBlog } from "@/app/actions/blogs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useActionState } from "react";

const NewBlog = () => {
  const { status } = useSession();

  if (status !== "authenticated") {
    redirect("/login");
  }

  const [state, formAction] = useActionState(createBlog, { error: "" });

  return (
    <div>
      <h1>Create new</h1>
      <form action={formAction}>
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
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};

export default NewBlog;
