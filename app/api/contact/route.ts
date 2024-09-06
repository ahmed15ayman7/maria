// app/api/contact/route.ts (POST and GET methods)
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { connectDB } from "@/mongoose";
import Contact from "@/lib/models/contact.model";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  
  const parsedBody = contactSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: parsedBody.error.errors }, { status: 400 });
  }

  const { name, email, message } = parsedBody.data;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    return NextResponse.json({ message: "Contact saved successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error saving contact" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB(); 

  try {
    const contacts = await Contact.find();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching contacts" }, { status: 500 });
  }
}
