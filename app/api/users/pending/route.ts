// app/api/users/pending/route.ts
import { NextResponse } from "next/server";
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";

export async function GET() {
  await connectDB();
  
  const users = await User.find({ isApproved: false }); // Adjust query as needed
  return NextResponse.json(users);
}