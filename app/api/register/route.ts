import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import  User  from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";


export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  try {
    await connectDB();
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Save the user to the database
    await user.save();

    return NextResponse.json({ user }, { status: 201 });
  } catch (error:any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
