import mongoose from 'mongoose';
import connect from '@/utils/db'; // Ensure this path is correct
import { NextResponse } from 'next/server';

const noticeSchema = new mongoose.Schema({
  date: String,
  headline: String,
  description: String,
   pinned: { type: Boolean}
});

const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);

export async function GET() {
  try {
    await connect(); // Ensure MongoDB connection
    const notices = await Notice.find(); // Fetch all notices
    return NextResponse.json(notices); // Return as JSON
  } catch (error) {
    console.error('Error fetching notices:', error);
    return NextResponse.json({ error: 'Error fetching notices' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connect(); // Ensure MongoDB connection
    const { date, headline, description } = await request.json(); // Parse JSON body
    const newNotice = new Notice({ date, headline, description });
    await newNotice.save(); // Save new notice
    return NextResponse.json(newNotice, { status: 201 }); // Return created notice
  } catch (error) {
    console.error('Error creating notice:', error);
    return NextResponse.json({ error: 'Error creating notice' }, { status: 500 });
  }
}
