// app/api/users/pending/route.ts
import { NextResponse } from "next/server";
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";

export async function GET() {
  try{

    await connectDB();
    
    const users = await User.find({ isApproved: {$in:[false,undefined]} });
    return NextResponse.json(users);
  }catch(e:any){
      return NextResponse.json({ message: "User not found.::"+e }, { status: 404 });
  }
}