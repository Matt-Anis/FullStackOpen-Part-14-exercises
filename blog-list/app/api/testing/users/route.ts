import { db } from "@/db";
import { users } from "@/db/schema";
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

  await db.insert(users).values(user);

  return NextResponse.json({ status: 200 });
};
