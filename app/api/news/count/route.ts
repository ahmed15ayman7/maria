import { NextResponse } from 'next/server';
import News from '@/lib/models/news.model';
import { connectDB } from '@/mongoose';

export async function GET(req: Request) {
  await connectDB();

  try {
    // جمع الأخبار حسب التاريخ
    const newsCount = await News.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // افترض أن لديك حقل createdAt
          count: { $sum: 1 } // عد الأخبار لكل تاريخ
        }
      },
      {
        $sort: { _id: 1 } // ترتيب النتائج حسب التاريخ
      }
    ]);

    // تحويل البيانات إلى تنسيق مناسب
    const result = newsCount.map(item => ({
      date: item._id,
      count: item.count
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching news count:', error);
    return NextResponse.json({ error: 'Failed to fetch news count' }, { status: 500 });
  }
}
