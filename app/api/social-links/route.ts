// app/api/social-links/route.ts
import SocialLink from '@/lib/models/SocialLink.model';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';

interface SocialLinkData {
    platform: string;
    url: string;
  }
  
  export async function GET() {
    await connectDB();
    const socialLinks: SocialLinkData[] = await SocialLink.find({
      platform: { $in: ['facebook', 'instagram', 'tiktok', 'twitter'] }
    });
    return NextResponse.json(socialLinks);
  }
  
  // POST: إضافة أو تحديث رابط اجتماعي
  export async function POST(req: Request) {
    await connectDB();
    const { platform, url }: SocialLinkData = await req.json();
  
    if (!platform || !url) {
      return NextResponse.json({ message: 'Both platform and URL are required.' }, { status: 400 });
    }
  
    // تحديث أو إضافة رابط
    await SocialLink.findOneAndUpdate({ platform }, { url }, { upsert: true });
  
    return NextResponse.json({ message: 'Social link updated successfully!' }, { status: 201 });
  }