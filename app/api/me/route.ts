import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const GET = async (req: NextRequest) => {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
    columns: {
      passwordHash: false,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
};
