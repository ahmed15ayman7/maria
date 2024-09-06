// app/api/feedback/route.ts
import { NextResponse } from 'next/server';
import Feedback, { IFeedback } from '@/lib/models/feedback.model';
import { connectDB } from '@/mongoose';

export async function GET() {
  await connectDB();
  const feedbacks = await Feedback.find();
  return NextResponse.json(feedbacks);
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body: IFeedback = await req.json();

    // Validate incoming data
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newFeedback = new Feedback(body);
    await newFeedback.save();

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
  }
}
