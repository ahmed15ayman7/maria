// app/api/news/item/route.ts
import { NextResponse } from 'next/server';
import News from '@/lib/models/news.model';
import { connectDB } from '@/mongoose';

// GET request to fetch a news article by its _id
export async function GET(req: Request) {
  await connectDB();

  // Extract search parameters from the request URL
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the 'id' query parameter

  if (!id) {
    return NextResponse.json({ error: 'ID query parameter is required' }, { status: 400 });
  }

  try {
    const newsItem = await News.findById(id);

    if (!newsItem) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    console.error('Error fetching news by id:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// PUT request to update a news article by its _id
export async function PUT(req: Request) {
  await connectDB();

  // Extract search parameters from the request URL
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the 'id' query parameter

  if (!id) {
    return NextResponse.json({ error: 'ID query parameter is required' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedNews = await News.findByIdAndUpdate(id, body, { new: true });

    if (!updatedNews) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error('Error updating news by id:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

// DELETE request to delete a news article by its _id
export async function DELETE(req: Request) {
  await connectDB();

  // Extract search parameters from the request URL
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Get the 'id' query parameter

  if (!id) {
    return NextResponse.json({ error: 'ID query parameter is required' }, { status: 400 });
  }

  try {
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'News article deleted successfully' });
  } catch (error) {
    console.error('Error deleting news by id:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
