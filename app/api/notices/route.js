// app/api/notices/route.js

import mongoose from 'mongoose';
import connect from '@/utils/db'; // Adjust the path if necessary
import { NextResponse } from 'next/server';

const noticeSchema = new mongoose.Schema({
  date: String,
  headline: String,
  description: String
});

const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);

export async function GET() {
  try {
    await connect(); // Ensure that the connection to MongoDB is established

    const notices = await Notice.find(); // Fetch all notices

    return NextResponse.json(notices); // Return the fetched notices as JSON
  } catch (error) {
    console.error('Error fetching notices:', error);
    return NextResponse.json({ error: 'Error fetching notices' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connect(); // Ensure that the connection to MongoDB is established

    const { date, headline, description } = await request.json(); // Parse the JSON body

    const newNotice = new Notice({ date, headline, description });
    await newNotice.save(); // Save the new notice to the database

    return NextResponse.json(newNotice, { status: 201 }); // Return the created notice
  } catch (error) {
    console.error('Error creating notice:', error);
    return NextResponse.json({ error: 'Error creating notice' }, { status: 500 });
  }
}
