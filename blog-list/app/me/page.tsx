"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCurrentUser, generateUserToken } from "../actions/users";

const TokenPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="border border-zinc-700 w-full rounded-md h-fit p-6">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <div className="flex flex-col gap-4 mb-6">
        <p>
          <strong>Name: </strong>
          {user?.name}
        </p>
        <p>
          <strong>Username: </strong>
          {user.username}
        </p>
      </div>
      <div className="w-full h-0.5 bg-zinc-700 mb-4" />
      <div>
        <h2 className="text-xl font-semibold mb-4 flex gap-4">API token</h2>
        {user?.token ? (
          <div className="mb-4 p-4 bg-zinc-800 rounded-md">{user.token}</div>
        ) : (
          <div>
            <p className="text-zinc-400 mb-4">
              You have no registered token, you can create a new one by clicking
              the button below
            </p>
          </div>
        )}
        <form action={generateUserToken}>
          <button
            type="submit"
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
