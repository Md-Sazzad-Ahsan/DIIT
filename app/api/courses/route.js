import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import { Courses } from '@/models/Courses/CourseName';

export async function POST(request) {
  try {
    const { semesterName, runningBatch, courses } = await request.json();

    // Connect to the database
    await dbConnect();

    // Create or update the semester in the Courses collection
    const update = {
      $set: {
        [`${semesterName}`]: {
          runningBatch,
          courses
        }
      }
    };

    const updatedCourses = await Courses.findOneAndUpdate(
      {},
      update,
      { upsert: true, new: true, runValidators: true } // Enable validation
    );

    return NextResponse.json({ message: 'Courses added successfully', updatedCourses }, { status: 200 });
  } catch (error) {
    console.error('Error adding courses:', error);
    return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 });
  }
}
