import { NextResponse } from "next/server";
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";

export async function POST(req: Request) {
  await connectDB();
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: "User ID is required." }, { status: 400 });
  }

  const user = await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  return NextResponse.json({ message: "User approved successfully." }, { status: 200 });
}