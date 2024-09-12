import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import { getBatchCoursesModel } from '@/models/Faculty/Courses';

// Handle GET request - Fetch all courses of a specific semester in a batch
export async function GET(request, { params }) {
  try {
    const { batchName, semesterName } = params;

    // Connect to the database
    await dbConnect();

    // Get the model for this batch
    const BatchCourses = getBatchCoursesModel(batchName);

    // Find the specific semester in the batch
    const batch = await BatchCourses.findOne({ batchName, 'semesters.semesterName': semesterName }, { 'semesters.$': 1 });

    if (!batch || batch.semesters.length === 0) {
      return NextResponse.json({ error: 'Semester not found' }, { status: 404 });
    }

    return NextResponse.json(batch.semesters[0], { status: 200 });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'An error occurred while fetching courses' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { batchName, semesterName } = params;
    const { courses } = await request.json();

    // Connect to the database
    await dbConnect();

    // Get the model for this batch
    const BatchCourses = getBatchCoursesModel(batchName);

    // Find the batch and update the specific semester's courses
    const updatedBatch = await BatchCourses.findOneAndUpdate(
      { batchName, 'semesters.semesterName': semesterName },
      { $set: { 'semesters.$.courses': courses } },
      { new: true, runValidators: true }
    );

    if (!updatedBatch) {
      return NextResponse.json({ error: 'Semester not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Courses updated successfully', semester: updatedBatch.semesters.find(s => s.semesterName === semesterName) }, { status: 200 });
  } catch (error) {
    console.error('Error updating courses:', error);
    return NextResponse.json({ error: 'An error occurred while updating courses' }, { status: 500 });
  }
}

// Handle PUT request - Update courses in a specific semester
export async function PUT(request, { params }) {
  try {
    const { batchName, semesterName } = params;
    const { courses } = await request.json();

    // Connect to the database
    await dbConnect();

    // Get the model for this batch
    const BatchCourses = getBatchCoursesModel(batchName);

    // Find the batch and update the specific semester's courses
    const updatedBatch = await BatchCourses.findOneAndUpdate(
      { batchName, 'semesters.semesterName': semesterName },
      { $set: { 'semesters.$.courses': courses } },
      { new: true, runValidators: true }
    );

    if (!updatedBatch) {
      return NextResponse.json({ error: 'Semester not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Courses updated successfully', semester: updatedBatch.semesters.find(s => s.semesterName === semesterName) }, { status: 200 });
  } catch (error) {
    console.error('Error updating courses:', error);
    return NextResponse.json({ error: 'An error occurred while updating courses' }, { status: 500 });
  }
}


// Handle DELETE request - Remove a semester or specific course in a semester
export async function DELETE(request, { params }) {
  try {
    const { batchName, semesterName } = params;
    const { courseCode } = await request.json(); // Optional, delete specific course by code

    // Connect to the database
    await dbConnect();

    // Get the model for this batch
    const BatchCourses = getBatchCoursesModel(batchName);

    let updatedBatch;

    if (courseCode) {
      // Delete a specific course from the semester
      updatedBatch = await BatchCourses.findOneAndUpdate(
        { batchName, 'semesters.semesterName': semesterName },
        { $pull: { 'semesters.$.courses': { CourseCode: courseCode } } },
        { new: true }
      );
    } else {
      // Delete the entire semester
      updatedBatch = await BatchCourses.findOneAndUpdate(
        { batchName },
        { $pull: { semesters: { semesterName } } },
        { new: true }
      );
    }

    if (!updatedBatch) {
      return NextResponse.json({ error: 'Semester or course not found' }, { status: 404 });
    }

    return NextResponse.json({ message: courseCode ? 'Course deleted successfully' : 'Semester deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting semester or course:', error);
    return NextResponse.json({ error: 'An error occurred while deleting semester or course' }, { status: 500 });
  }
}
