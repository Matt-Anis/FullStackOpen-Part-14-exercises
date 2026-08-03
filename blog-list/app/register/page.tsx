"use client";
import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "../actions/register";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { errors: {} });

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" />
          </label>
          {state.errors?.username && <p>{state.errors.username}</p>}
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          {state.errors?.password && <p>{state.errors.password}</p>}
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="passwordConfirm" />
          </label>
          {state.errors?.passwordConfirm && (
            <p>{state.errors.passwordConfirm}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
        <p>
          Already have an account? <Link href={"/login"}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
