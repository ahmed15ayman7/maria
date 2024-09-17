// app/api/about/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/mongoose';
import About from '@/lib/models/about.model';

function getSearchParams(url: string) {
  const params = new URL(url).searchParams;
  return params.get('id'); 
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { imageUrl, title,details } = await req.json();
    const updatedAbout = await About.findByIdAndUpdate({id:"1"}, { imageUrl, title,details}, { new: true });
    return NextResponse.json({ message: 'About created successfully', updatedAbout }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create about', error }, { status: 500 });
  }
}

// READ all abouts (GET)
export async function GET(req: Request) {
  try {
    await connectDB();
    const searchParams = getSearchParams(req.url);

    if (searchParams) {
      const about = await About.findById(searchParams);
      if (!about) {
        return NextResponse.json({ message: 'About not found' }, { status: 404 });
      }
      return NextResponse.json({ about }, { status: 200 });
    } else {
      const abouts = await About.findOne({id:"1"});
      return NextResponse.json({ abouts }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch abouts', error }, { status: 500 });
  }
}

// UPDATE and DELETE API (PUT, DELETE)
export async function PUT(req: Request) {
  try {
    await connectDB();
    const searchParams = getSearchParams(req.url);
    
    if (!searchParams) {
      return NextResponse.json({ message: 'About ID is required' }, { status: 400 });
    }

    const { imageUrl, title,details } = await req.json();
    const updatedAbout = await About.findByIdAndUpdate(searchParams, { imageUrl, title,details}, { new: true });

    if (!updatedAbout) {
      return NextResponse.json({ message: 'About not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'About updated successfully', updatedAbout }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update about', error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const searchParams = getSearchParams(req.url);

    if (!searchParams) {
      return NextResponse.json({ message: 'About ID is required' }, { status: 400 });
    }

    const deletedAbout = await About.findByIdAndDelete(searchParams);

    if (!deletedAbout) {
      return NextResponse.json({ message: 'About not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'About deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete about', error }, { status: 500 });
  }
}
