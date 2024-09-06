// app/api/news/delete/route.ts
import News from '@/lib/models/news.model';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  await connectDB();

  const { id } = await request.json(); // Parse the request body

  if (!id) {
    return NextResponse.json({ message: 'News ID is required' }, { status: 400 });
  }

  try {
    const deletedNews = await News.findByIdAndDelete(id);
    
    if (!deletedNews) {
      return NextResponse.json({ message: 'News article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'News article deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting news article:", error);
    return NextResponse.json({ message: 'Error deleting news article', error }, { status: 500 });
  }
}
