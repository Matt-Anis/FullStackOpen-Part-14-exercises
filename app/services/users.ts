import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  return db.query.users.findMany();
};

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};
