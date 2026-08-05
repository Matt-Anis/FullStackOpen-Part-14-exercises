import {
  integer,
  pgTable,
  serial,
  text,
  boolean,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  author: text("author").notNull(),
  title: text("title").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});

export const readingList = pgTable(
  "reading_list",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    blogId: integer("blog_id")
      .notNull()
      .references(() => blogs.id),
    read: boolean("read").notNull().default(false),
  },
  (table) => [unique().on(table.userId, table.blogId)],
);

export const readingListRelations = relations(readingList, ({ one }) => ({
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingList),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));
