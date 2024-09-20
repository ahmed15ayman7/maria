import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";

// استخدام متغير بيئي للـ JWT_SECRET مع تعيين قيمة افتراضية للأمان
const secret = process.env.JWT_SECRET || "default_secret_key"; // غيّر القيمة الافتراضية في .env

export async function POST(request: Request) {
  try {
    await connectDB(); // تأكيد الاتصال بقاعدة البيانات

    const { email, password } = await request.json();

    // التحقق من إدخال البريد الإلكتروني وكلمة المرور
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // البحث عن المستخدم من خلال البريد الإلكتروني
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // التحقق من صحة كلمة المرور باستخدام bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // توليد الـ JWT مع إعدادات الأمان مثل التوقيع ومدة الصلاحية
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      secret, 
      { expiresIn: "30d" } // جعل مدة الصلاحية 30 يومًا (تعدل حسب المطلوب)
    );

    const response = NextResponse.json(
      { message: "Login successful.",isApproved: user.isApproved },
      
      { status: 200 }
    );

    // تعيين الـ JWT في الكوكيز بشكل آمن
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // استخدم الـ https في الإنتاج
      maxAge: 60 * 60 * 24 * 30, // الكوكيز تنتهي بعد 30 يومًا
      sameSite: "strict", // لحماية الكوكيز من هجمات CSRF
    });

    return response;
  } catch (error: any) {
    // تسجيل الخطأ وإرجاع استجابة مع توضيح المشكلة
    console.error("Login error:", error.message);

    return NextResponse.json(
      { message: "An error occurred while processing your request.", error: error.message },
      { status: 500 }
    );
  }
}
