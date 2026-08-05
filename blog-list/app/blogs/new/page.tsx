"use client";
import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    success: false,
  });
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog added successfully");
      redirect("/blogs");
    }
  }, [state, showNotification]);

  return (
    <div className="mx-10 my-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold font-mono text-zinc-100">Create new</h1>

      <form
        action={formAction}
        className="flex flex-col gap-4 p-6 rounded-xl border border-zinc-700 max-w-lg"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm text-zinc-400">
            Title
          </label>
          <input
            id="title"
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
          <label htmlFor="author" className="text-sm text-zinc-400">
            Author
          </label>
          <input
            id="author"
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
          <label htmlFor="url" className="text-sm text-zinc-400">
            URL
          </label>
          <input
            id="url"
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
          data-testid="create-blog-button"
          className="self-start px-6 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
