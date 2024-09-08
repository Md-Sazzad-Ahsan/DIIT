import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db'; // Ensure this path is correct
import Student from '@/models/Student';

// Connect to MongoDB
async function getDatabase() {
  await dbConnect();
}

// GET all students
export async function GET(request) {
  await getDatabase();

  const { searchParams } = new URL(request.url);
  const studentID = searchParams.get('studentID');  // Fetch the query parameter

  try {
    if (studentID) {
      // Find a specific student by StudentID
      const student = await Student.findOne({ StudentID: studentID }).lean();
      if (!student) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
      }
      return NextResponse.json(student);
    }

    // If no studentID is provided, return all students
    const students = await Student.find({}).lean();
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new student
export async function POST(request) {
  await getDatabase();

  try {
    const data = await request.json();

    // Validation: Check if StudentID is present
    if (!data.StudentID) {
      return NextResponse.json({ error: 'StudentID is required' }, { status: 400 });
    }

    const student = new Student(data);
    await student.save();
    return NextResponse.json(student);
  } catch (error) {
    // Check for MongoDB duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Student with this ID already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update) a student
// PUT (update) a student
export async function PUT(request) {
  await getDatabase();

  try {
    const data = await request.json();
    const { StudentID, ...updateData } = data;

    // Validation: Check if StudentID is provided
    if (!StudentID) {
      return NextResponse.json({ error: 'Student_ID is required for update' }, { status: 400 });
    }

    // Check if another student with the same ID exists
    const existingStudent = await Student.findOne({ StudentID });
    if (existingStudent && existingStudent._id.toString() !== data._id) {
      return NextResponse.json({ error: 'Student with this ID already exists' }, { status: 409 });
    }

    const student = await Student.findOneAndUpdate(
      { _id: data._id }, // Ensure correct identifier for update
      updateData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// DELETE a student
export async function DELETE(request) {
  await getDatabase();

  try {
    const data = await request.json();
    const { StudentID } = data;

    // Validation: Check if StudentID is provided
    if (!StudentID) {
      return NextResponse.json({ error: 'StudentID is required for deletion' }, { status: 400 });
    }

    const student = await Student.findOneAndDelete({ StudentID });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
