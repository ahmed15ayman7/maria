import { NextResponse } from 'next/server';
import News from '@/lib/models/news.model';
import { connectDB } from '@/mongoose';

// GET request to fetch all news or filter by category or title
export async function GET(req: Request) {
  await connectDB();

  const url = new URL(req.url);
  const search = url.searchParams.get('search') || ''; // الحصول على معامل البحث من URL

  try {
    const newsQuery = search 
      ?  {
        $or: [
          { title: { $regex: search, $options: 'i' } }, // البحث في العنوان
          { author: { $regex: search, $options: 'i' } }, // البحث في المؤلف
          { category: { $regex: search, $options: 'i' } }, // البحث في الفئة
        ],
      } 
      : {}; // إذا لم يكن هناك بحث، احصل على جميع الأخبار

    const news = await News.find(newsQuery);
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// POST request to create a new news article
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    // Validate incoming data
    if (!body.title || !body.content || !body.author || !body.category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (body._id) {
      const newNews = await News.findByIdAndUpdate(body._id,body);
      if (!newNews) {
        return NextResponse.json({ error: '_id not found' }, { status: 400 });
      }
      return NextResponse.json(newNews, { status: 201 });
    }else{
      const newNews = new News(body);
      await newNews.save();
      
      return NextResponse.json(newNews, { status: 201 }); // Return the created news with a 201 status
    }
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
