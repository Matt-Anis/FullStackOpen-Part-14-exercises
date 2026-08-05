"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} className="hover:text-zinc-400 hover:underline-offset-1">
    {children}
  </Link>
);

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="my-4 mx-10 py-4 px-10 bg-zinc-800/75 backdrop-blur-lg  rounded-full flex items-center gap-4">
      <NavLink href="/">home</NavLink>
      <NavLink href="/blogs">blogs</NavLink>
      <NavLink href="/users">users</NavLink>
      {session ? (
        <div className="ml-auto flex gap-4 items-center">
          <NavLink href="/blogs/new">create new</NavLink>
          <NavLink href="/me">me</NavLink>
          <em>{session.user?.name} logged in</em>{" "}
          <button
            className="bg-zinc-50 py-1 px-4 rounded-full text-zinc-800 hover:bg-zinc-200 hover:text-zinc-600 cursor-pointer"
            onClick={() => signOut()}
          >
            logout
          </button>
        </div>
      ) : (
        <div className="ml-auto flex gap-4">
          <Link href="/register">register</Link>
          <Link href="/login">login</Link>
        </div>
      )}
    </nav>
  );
}
