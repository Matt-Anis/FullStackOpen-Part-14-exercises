"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, likeBlog as updateBlogLikes } from "../services/blogs";

type BlogFormState = {
  errors: {
    title?: string;
    author?: string;
    url?: string;
  };
  values?: {
    title: string;
    author: string;
    url: string;
  };
};

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  if (!title || title.length < 5) {
    return {
      errors: { title: "minimum length for title is 5 characters long" },
      values: { title, author, url },
    };
  }
  if (!author || author.length < 5) {
    return {
      errors: { author: "minimum length for author is 5 characters long" },
      values: { title, author, url },
    };
  }
  if (!url || url.length < 5) {
    return {
      errors: { url: "minimum length for url is 5 characters long" },
      values: { title, author, url },
    };
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await updateBlogLikes(id);
  revalidatePath(`/blogs/${id}`);
};

export const searchBlogs = async (formData: FormData) => {
  const keyword = formData.get("keyword") as string;
  if (!keyword.trim()) redirect("/blogs");
  redirect(`/blogs?filter=${encodeURIComponent(keyword)}`);
};
