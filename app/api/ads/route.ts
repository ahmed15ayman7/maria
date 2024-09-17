// app/api/ads/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/mongoose';
import Ad from '@/lib/models/Ad.model';


// Helper function to get search params from the URL
function getSearchParams(url: string) {
  const params = new URL(url).searchParams;
  return params.get('id'); // We need 'id' from the query
}

// CREATE and READ API (POST, GET)
export async function POST(req: Request) {
  try {
    await connectDB();
    const { imageUrl, redirectUrl } = await req.json();
    const newAd = new Ad({ imageUrl, redirectUrl });
    await newAd.save();
    return NextResponse.json({ message: 'Ad created successfully', newAd }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create ad', error }, { status: 500 });
  }
}

// READ all ads (GET)
export async function GET(req: Request) {
  try {
    await connectDB();
    const searchParams = getSearchParams(req.url);

    if (searchParams) {
      // If an ID is provided, return that specific ad
      const ad = await Ad.findById(searchParams);
      if (!ad) {
        return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
      }
      return NextResponse.json({ ad }, { status: 200 });
    } else {
      // Otherwise, return all ads
      const ads = await Ad.find();
      return NextResponse.json({ ads }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch ads', error }, { status: 500 });
  }
}

// UPDATE and DELETE API (PUT, DELETE)
export async function PUT(req: Request) {
  try {
    await connectDB();
    const searchParams = getSearchParams(req.url);
    
    if (!searchParams) {
      return NextResponse.json({ message: 'Ad ID is required' }, { status: 400 });
    }

    const { imageUrl, redirectUrl } = await req.json();
    const updatedAd = await Ad.findByIdAndUpdate(searchParams, { imageUrl, redirectUrl }, { new: true });

    if (!updatedAd) {
      return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Ad updated successfully', updatedAd }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update ad', error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const searchParams = getSearchParams(req.url);

    if (!searchParams) {
      return NextResponse.json({ message: 'Ad ID is required' }, { status: 400 });
    }

    const deletedAd = await Ad.findByIdAndDelete(searchParams);

    if (!deletedAd) {
      return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Ad deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete ad', error }, { status: 500 });
  }
}
