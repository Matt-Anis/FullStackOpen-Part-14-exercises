"use server";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

type RegisterState = {
  errors: {
    username?: string;
    password?: string;
    passwordConfirm?: string;
  };
};

export const registerUser = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const errors: RegisterState["errors"] = {};

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters";
  }
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existing) {
    return { errors: { username: "Username already taken" } };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });
  redirect("/login");
};

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
    columns: { passwordHash: false },
    with: {
      readingList: {
        columns: {},
        with: {
          blog: true,
        },
      },
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const generateUserToken = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  const token = crypto.randomUUID();
  await db
    .update(users)
    .set({ token })
    .where(eq(users.username, session.user.email));
  revalidatePath("/me");
};
