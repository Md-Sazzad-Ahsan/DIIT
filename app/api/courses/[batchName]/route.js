import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import { getBatchCoursesModel } from '@/models/Faculty/Courses';

// Handle GET request - Fetch semesters of a specific batch
export async function GET(request, { params }) {
  try {
    const { batchName } = params;

    // Connect to the database
    await dbConnect();

    // Get the model for this batch
    const BatchCourses = getBatchCoursesModel(batchName);

    // Fetch the specific batch
    const batch = await BatchCourses.findOne({ batchName });

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    return NextResponse.json(batch.semesters, { status: 200 });
  } catch (error) {
    console.error('Error fetching semesters:', error);
    return NextResponse.json({ error: 'An error occurred while fetching semesters' }, { status: 500 });
  }
}

// Handle POST request - Add a new semester to a specific batch
export async function POST(request, { params }) {
  try {
    const { batchName } = params;
    const { semesterName, courses } = await request.json();

    // Connect to the database
    await dbConnect();

    // Get the model for this batch
    const BatchCourses = getBatchCoursesModel(batchName);

    // Find the batch and update it by adding a new semester
    const updatedBatch = await BatchCourses.findOneAndUpdate(
      { batchName },
      { $push: { semesters: { semesterName, courses } } },
      { new: true, runValidators: true }
    );

    if (!updatedBatch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Semester added successfully', batch: updatedBatch }, { status: 201 });
  } catch (error) {
    console.error('Error adding semester:', error);
    return NextResponse.json({ error: 'An error occurred while adding semester' }, { status: 500 });
  }
}

// Handle DELETE request - Delete the entire batch
export async function DELETE(request, { params }) {
  try {
    const { batchName } = params;

    // Connect to the database
    await dbConnect();

    // Get the model for this batch
    const BatchCourses = getBatchCoursesModel(batchName);

    // Delete the entire batch
    const deletedBatch = await BatchCourses.findOneAndDelete({ batchName });

    if (!deletedBatch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Batch deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting batch:', error);
    return NextResponse.json({ error: 'An error occurred while deleting batch' }, { status: 500 });
  }
}
