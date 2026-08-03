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

  const [state, formAction] = useActionState(createBlog, { errors: {} });

  return (
    <div>
      <h1>Create new</h1>
      <form action={formAction}>
        <div>
          title:{" "}
          <input
            name="title"
            required
            minLength={1}
            defaultValue={state.values?.title}
          />
          {state.errors.title && (
            <p style={{ color: "red" }}>{state.errors.title}</p>
          )}
        </div>
        <div>
          <div>
            author:{" "}
            <input
              name="author"
              required
              minLength={1}
              defaultValue={state.values?.author}
            />
            {state.errors.author && (
              <p style={{ color: "red" }}>{state.errors.author}</p>
            )}
          </div>
          <div>
            url:{" "}
            <input
              name="url"
              required
              minLength={1}
              defaultValue={state.values?.url}
            />
            {state.errors.url && (
              <p style={{ color: "red" }}>{state.errors.url}</p>
            )}
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
