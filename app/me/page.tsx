"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCurrentUser, generateUserToken } from "../actions/users";
import Link from "next/link";
import { markBlogAsReadForCurrentUser } from "../actions/blogs";

const TokenPage = async () => {
  const user = await getCurrentUser();
  const readBlogs = user.readingList
    .filter((entry) => entry.read)
    .map((entry) => entry.blog);
  const unreadBlogs = user.readingList
    .filter((entry) => !entry.read)
    .map((entry) => entry.blog);

  if (!user) {
    redirect("/login");
  }

  return (
    <div
      data-testid="user-profile"
      className="border border-zinc-700 w-full rounded-lg h-fit p-6"
    >
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <div className="flex flex-col gap-4 mb-6">
        <p>
          <strong>Name: </strong>
          <span data-testid="user-name">{user?.name}</span>
        </p>
        <p>
          <strong>Username: </strong>
          <span data-testid="user-username">{user.username}</span>
        </p>
      </div>
      <div className="w-full h-0.5 bg-zinc-700 mb-4" />
      <div
        data-testid="reading-list-section"
        className="mb-4 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold ">Reading List</h2>
        <ul>
          {readBlogs.length + unreadBlogs.length ? (
            <div data-testid="unread-section">
              <h3 className="text-lg font-semibold mb-4">
                Unread ({unreadBlogs.length})
              </h3>
              {unreadBlogs.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-zinc-400">
                  No unread blogs
                </p>
              ) : (
                unreadBlogs.map((blog) => (
                  <li key={blog.id}>
                    <div className="w-full mb-2 px-6 py-4 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-colors flex flex-row">
                      <Link href={`/blogs/${blog.id}`}>
                        <div className="w-full flex flex-col gap-2">
                          <p className="text-xl capitalize font-semibold text-zinc-100">
                            {blog.title}
                          </p>
                          <p className="text-sm text-zinc-400">
                            by {blog.author}
                          </p>
                          <p className="text-sm text-zinc-500">
                            ♥ {blog.likes} likes
                          </p>
                        </div>
                      </Link>
                      <form
                        action={markBlogAsReadForCurrentUser.bind(
                          null,
                          blog.id,
                        )}
                        className="ml-auto"
                      >
                        <button
                          data-testid={`mark-read-${blog.id}`}
                          className="py-1 px-4 bg-zinc-50 text-zinc-900 rounded cursor-pointer"
                        >
                          mark as read
                        </button>
                      </form>
                    </div>
                  </li>
                ))
              )}
              <h3 className="text-lg font-semibold my-4">
                Read ({readBlogs.length})
              </h3>
              {readBlogs.map((blog) => (
                <li key={blog.id}>
                  <Link href={`/blogs/${blog.id}`}>
                    <div className="w-full mb-2 px-6 py-4 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-colors">
                      <div className="w-full flex flex-col gap-2">
                        <p className="text-xl capitalize font-semibold text-zinc-100">
                          {blog.title}
                        </p>
                        <p className="text-sm text-zinc-400">
                          by {blog.author}
                        </p>
                        <p className="text-sm text-zinc-500">
                          ♥ {blog.likes} likes
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </div>
          ) : (
            <p data-testid="empty-reading-list" className="text-zinc-400">
              No blogs in the readlist yet
            </p>
          )}
        </ul>
      </div>
      <div className="w-full h-0.5 bg-zinc-700 mb-4" />
      <div data-testid="api-token-section">
        <h2 className="text-xl font-semibold mb-4 flex gap-4">API token</h2>
        {user?.token ? (
          <div
            data-testid="token-display"
            className="mb-4 p-4 bg-zinc-800 rounded-md"
          >
            <code data-testid="api-token">{user.token}</code>
          </div>
        ) : (
          <div>
            <p data-testid="no-token-message" className="text-zinc-400 mb-4">
              You have no registered token, you can create a new one by clicking
              the button below
            </p>
          </div>
        )}
        <form action={generateUserToken} className="mb-6">
          <button
            type="submit"
            data-testid="generate-token-button"
            className="cursor-pointer px-4 py-2 bg-zinc-50 text-zinc-950 rounded-md"
          >
            create new token
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenPage;
