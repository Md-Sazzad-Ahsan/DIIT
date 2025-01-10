// pages/api/semesters/[id]/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import { Semester } from '@/models/Semester/Semester';

export async function GET({ params }) {
  try {
    await dbConnect();
    const semester = await Semester.findById(params.id).populate('courses');

    if (!semester) {
      return NextResponse.json({ error: 'Semester not found' }, { status: 404 });
    }

    return NextResponse.json(semester, { status: 200 });
  } catch (error) {
    console.error('Error fetching semester:', error);
    return NextResponse.json({ error: 'Failed to fetch semester' }, { status: 500 });
  }
}

export async function PUT({ params, request }) {
  try {
    const { semesterName, courseIds } = await request.json();
    await dbConnect();

    const updatedSemester = await Semester.findByIdAndUpdate(
      params.id,
      { semesterName, courses: courseIds },
      { new: true, runValidators: true }
    ).populate('courses');

    if (!updatedSemester) {
      return NextResponse.json({ error: 'Semester not found' }, { status: 404 });
    }

    return NextResponse.json(updatedSemester, { status: 200 });
  } catch (error) {
    console.error('Error updating semester:', error);
    return NextResponse.json({ error: 'Failed to update semester' }, { status: 500 });
  }
}

export async function DELETE({ params }) {
  try {
    await dbConnect();
    const deletedSemester = await Semester.findByIdAndDelete(params.id);

    if (!deletedSemester) {
      return NextResponse.json({ error: 'Semester not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Semester deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting semester:', error);
    return NextResponse.json({ error: 'Failed to delete semester' }, { status: 500 });
  }
}
