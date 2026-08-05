"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotification } from "../components/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log("DEBUG: result", result);
    if (!result.error) {
      showNotification("Successfully logged in");
      router.push("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-full mx-auto my-6 flex flex-col gap-6 max-w-lg">
      {" "}
      <h2 className="flex self-center text-4xl font-bold font-mono text-zinc-100">
        Login
      </h2>
      {error && (
        <p data-testid="error-message" className="text-red-500 text-sm">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 rounded-xl border border-zinc-700"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm text-zinc-400">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-zinc-400">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          data-testid="login-button"
          className="w-full mt-4 px-6 py-2 rounded-lg bg-zinc-50 text-zinc-900 cursor-pointer"
        >
          Login
        </button>
      </form>
      <p className="flex felx-col self-center text-sm text-zinc-400 ">
        New here?{"  "}
        <Link
          href="/register"
          className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
