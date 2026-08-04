"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, likeBlog as updateBlogLikes } from "../services/blogs";
import { auth } from "@/auth";
import { db } from "@/db";
import { readingList } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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

export const isBlogInReadingListOfCurrentUser = async (blogId: number) => {
  const session = await auth();
  if (!session?.user?.id) {
    return false;
  }

  const entry = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, Number(session.user?.id)),
      eq(readingList.blogId, blogId),
    ),
  });

  return !!entry;
};

export const addBlogToReadingListOfCurrentUser = async (blogId: number) => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await db
    .insert(readingList)
    .values({ userId: Number(session.user?.id), blogId })
    .onConflictDoNothing();

  revalidatePath(`/blogs/${blogId}`);
};

export const removeBlogFromReadingListOfCurrentUser = async (
  blogId: number,
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(readingList)
    .where(
      and(
        eq(readingList.blogId, blogId),
        eq(readingList.userId, Number(session.user?.id)),
      ),
    );

  revalidatePath(`/blogs/${blogId}`);
};

export const markBlogAsReadForCurrentUser = async (blogId: number) => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.userId, Number(session.user.id)),
        eq(readingList.blogId, blogId),
      ),
    );

  revalidatePath("/me");
};
