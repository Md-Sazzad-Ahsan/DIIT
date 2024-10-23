// pages/api/semesters/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import { Semester } from '@/models/Semester';
import { Course } from '@/models/Course';

export async function GET() {
  try {
    await dbConnect();
    const semesters = await Semester.find().populate('courses');
    return NextResponse.json(semesters, { status: 200 });
  } catch (error) {
    console.error('Error fetching semesters:', error);
    return NextResponse.json({ error: 'Failed to fetch semesters' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { semesterName, courseIds } = await request.json();
    await dbConnect();

    const newSemester = new Semester({
      semesterName,
      courses: courseIds
    });

    const savedSemester = await newSemester.save();
    return NextResponse.json(savedSemester, { status: 201 });
  } catch (error) {
    console.error('Error creating semester:', error);
    return NextResponse.json({ error: 'Failed to create semester' }, { status: 500 });
  }
}
