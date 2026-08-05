"use client";
import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { errors: {} });

  return (
    <div className="w-full mx-auto my-6 flex flex-col gap-6 max-w-lg">
      <h2 className="flex self-center text-4xl font-bold font-mono text-zinc-100">
        Register
      </h2>

      <form
        action={formAction}
        className="flex flex-col gap-4 p-6 rounded-xl border border-zinc-700"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm text-zinc-400">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          {state.errors?.username && (
            <p data-testid="username-error" className="text-red-500 text-sm">{state.errors.username}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-zinc-400">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-zinc-400">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          {state.errors?.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="passwordConfirm" className="text-sm text-zinc-400">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          {state.errors?.passwordConfirm && (
            <p data-testid="passwordConfirm-error" className="text-red-500 text-sm">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          data-testid="register-button"
          className="w-full mt-4 px-6 py-2 rounded-lg bg-zinc-50 text-zinc-900 cursor-pointer"
        >
          Register
        </button>
      </form>

      <p className="flex self-center text-sm text-zinc-400">
        Already have an account?{"  "}
        <Link
          href="/login"
          className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
