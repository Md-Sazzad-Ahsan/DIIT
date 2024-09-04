import mongoose from 'mongoose';
import connect from '@/utils/db'; // Ensure this path is correct
import { NextResponse } from 'next/server';

const noticeSchema = new mongoose.Schema({
  date: String,
  headline: String,
  description: String
});

const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);

export async function GET(request, { params }) {
  try {
    await connect(); // Ensure MongoDB connection
    const { id } = params; // Extract ID from params
    const notice = await Notice.findById(id); // Find notice by ID
    if (!notice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }
    return NextResponse.json(notice); // Return found notice
  } catch (error) {
    console.error('Error fetching notice:', error);
    return NextResponse.json({ error: 'Error fetching notice' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connect(); // Ensure MongoDB connection
    const { id } = params; // Extract ID from params
    const { date, headline, description } = await request.json(); // Parse JSON body
    const updatedNotice = await Notice.findByIdAndUpdate(id, { date, headline, description }, { new: true });
    if (!updatedNotice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }
    return NextResponse.json(updatedNotice); // Return updated notice
  } catch (error) {
    console.error('Error updating notice:', error);
    return NextResponse.json({ error: 'Error updating notice' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connect(); // Ensure MongoDB connection
    const { id } = params; // Extract ID from params
    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }
    return NextResponse.json(deletedNotice); // Return deleted notice
  } catch (error) {
    console.error('Error deleting notice:', error);
    return NextResponse.json({ error: 'Error deleting notice' }, { status: 500 });
  }
}
