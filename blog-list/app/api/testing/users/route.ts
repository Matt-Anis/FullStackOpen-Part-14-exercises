import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type UserType = {
  username: string;
  name: string;
  password: string;
};

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const user: UserType = await req.json();
  const passwordHash = await bcrypt.hash(user.password, 10);
  await db
    .insert(users)
    .values({ username: user.username, name: user.name, passwordHash });

  return NextResponse.json({ message: "ok" });
};
