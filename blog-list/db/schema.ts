import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

// author, url, and likes.

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  author: text("author").notNull(),
  title: text("title").notNull(),
  likes: integer("likes").notNull().default(0),
});
