import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  User  from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";


const secret = process.env.JWT_SECRET || "rrrrrrpklmlmnugykbhnvgh";

export async function POST(request: Request) {
  try {
    await connectDB(); // Ensure the database is connected

    const { email, password } = await request.json();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set the token as a cookie
    response.cookies.set("authToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 1 month
    });

    return response;
  } catch (error:any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
