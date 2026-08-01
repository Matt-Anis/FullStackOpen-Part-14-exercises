import { blogs } from "@/db/schema";
import { db } from "@/db";
import { eq, or, ilike, sql } from "drizzle-orm";

export const getAll = async () => {
  return db.query.blogs.findMany();
};

export const getById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
    with: { user: true },
  });
};

export const getByKeyword = async (keyword: string) => {
  return db.query.blogs.findMany({
    where: or(
      ilike(blogs.author, `%${keyword}%`),
      ilike(blogs.title, `%${keyword}%`),
    ),
    with: { user: true },
  });
};

export const likeBlog = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};

export const addBlog = async (title: string, author: string, url: string) => {
  return db.insert(blogs).values({ title, author, url, userId: 1 }); // TODO: should fix this to use real user id
};
