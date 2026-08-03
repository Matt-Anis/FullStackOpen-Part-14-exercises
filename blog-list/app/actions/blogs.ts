"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, likeBlog as updateBlogLikes } from "../services/blogs";

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  if (
    !title ||
    title.length < 5 ||
    !author ||
    author.length < 5 ||
    !url ||
    url.length < 5
  ) {
    return {
      error: "minimum length for title, author and url is 5 characters long",
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
