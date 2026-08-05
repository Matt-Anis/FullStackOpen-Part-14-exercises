import { db } from "@/db";
import { blogs, readingList, users } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  await db.execute(
    sql`TRUNCATE users, blogs, reading_list RESTART IDENTITY CASCADE`,
  );

  return NextResponse.json({ message: "ok" });
};
