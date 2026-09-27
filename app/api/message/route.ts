import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET：获取所有留言
export async function GET() {
  const [rows] = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
  return NextResponse.json(rows);
}

// POST：新增留言
export async function POST(req: NextRequest) {
  const { name, content } = await req.json();
  if (!name || !content) {
    return NextResponse.json({ msg: "名称和内容不能为空" }, { status: 400 });
  }
  await pool.query(
    "INSERT INTO messages (name, content, created_at) VALUES (?, ?, NOW())",
    [name, content]
  );
  return NextResponse.json({ msg: "留言提交成功" });
}
