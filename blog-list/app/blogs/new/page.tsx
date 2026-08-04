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
    <div className="mx-10 my-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold font-mono text-zinc-100">Create new</h1>

      <form
        action={formAction}
        className="flex flex-col gap-4 p-6 rounded-xl border border-zinc-700 max-w-lg"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-400">Title</label>
          <input
            name="title"
            required
            minLength={5}
            defaultValue={state.values?.title}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          {state.errors.title && (
            <p className="text-red-500 text-sm">{state.errors.title}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-400">Author</label>
          <input
            name="author"
            required
            minLength={5}
            defaultValue={state.values?.author}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          {state.errors.author && (
            <p className="text-red-500 text-sm">{state.errors.author}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-zinc-400">URL</label>
          <input
            name="url"
            required
            minLength={5}
            defaultValue={state.values?.url}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          {state.errors.url && (
            <p className="text-red-500 text-sm">{state.errors.url}</p>
          )}
        </div>

        <button
          type="submit"
          className="self-start px-6 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
