import { db } from "@/db";
import { blogs, readingList, users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  await db.delete(readingList);
  await db.delete(blogs);
  await db.delete(users);

  return NextResponse.json({ status: 200 });
};
