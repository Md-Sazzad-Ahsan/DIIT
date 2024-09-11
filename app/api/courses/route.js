import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import { getBatchCoursesModel } from '@/models/Faculty/Courses';

// Handle GET request - List all batch names
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Get all batch models
    const batches = Object.keys(mongoose.models).filter(modelName => modelName.endsWith('_courses'));
    
    return NextResponse.json(batches, { status: 200 });
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json({ error: 'An error occurred while fetching batches' }, { status: 500 });
  }
}

// Handle POST request - Create a new batch
export async function POST(request) {
  try {
    const { batchName } = await request.json();

    // Connect to the database
    await dbConnect();

    // Create a new model for this batch if it doesn't exist
    const BatchCourses = getBatchCoursesModel(batchName);

    // Check if the batch already exists
    const existingBatch = await BatchCourses.findOne({ batchName });
    if (existingBatch) {
      return NextResponse.json({ error: 'Batch already exists' }, { status: 400 });
    }

    // Create a new empty batch
    const newBatch = new BatchCourses({ batchName, semesters: [] });
    await newBatch.save();

    return NextResponse.json({ message: 'Batch created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json({ error: 'An error occurred while creating the batch' }, { status: 500 });
  }
}
