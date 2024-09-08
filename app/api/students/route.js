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
    const { StudentID, email, phoneNumber } = data;

    if (!StudentID || !email || !phoneNumber) {
      return NextResponse.json({ error: 'StudentID, Email, and Phone Number are required' }, { status: 400 });
    }

    // Check if a student with the same StudentID already exists
    const existingStudentByID = await Student.findOne({ StudentID });
    if (existingStudentByID) {
      return NextResponse.json({ error: 'Student with this ID already exists.' }, { status: 409 });
    }

    // Check if a student with the same email already exists
    const existingStudentByEmail = await Student.findOne({ email });
    if (existingStudentByEmail) {
      return NextResponse.json({ error: 'Student with this email already exists.' }, { status: 409 });
    }

    // Check if a student with the same phone number already exists
    const existingStudentByPhone = await Student.findOne({ phoneNumber });
    if (existingStudentByPhone) {
      return NextResponse.json({ error: 'Student with this phone number already exists.' }, { status: 409 });
    }

    // Create a new student if no duplicates are found
    const student = new Student(data);
    await student.save();

    return NextResponse.json({ message: 'Student added successfully', student }, { status: 201 });
  } catch (error) {
    // Return a user-friendly error message
    return NextResponse.json(
      { error: 'Student with these record already Exists. Please try again.' },
      { status: 500 }
    );
  }
}


// PUT (update) a student
export async function PUT(request) {
  await getDatabase();

  try {
    const data = await request.json();
    const { StudentID, _id, phoneNumber, email } = data; 

    // Validate if both _id and StudentID are provided
    if (!StudentID || !_id) {
      return NextResponse.json({ error: 'StudentID are required for updating the student' }, { status: 400 });
    }

    // Check if student exists by _id
    const existingStudent = await Student.findById(_id);
    if (!existingStudent) {
      return NextResponse.json({ error: 'Student not found with the provided ID' }, { status: 404 });
    }

    // Check if phone number or email is already in use by another student
    const duplicatePhone = await Student.findOne({ phoneNumber, _id: { $ne: _id } });
    if (duplicatePhone) {
      return NextResponse.json({ error: 'Phone number is already in use by another student' }, { status: 409 });
    }

    const duplicateEmail = await Student.findOne({ email, _id: { $ne: _id } });
    if (duplicateEmail) {
      return NextResponse.json({ error: 'Email is already in use by another student' }, { status: 409 });
    }

    // Update student information based on the provided data
    const updatedStudent = await Student.findByIdAndUpdate(_id, data, { new: true, runValidators: true });

    return NextResponse.json({ message: 'Student updated successfully', student: updatedStudent }, { status: 200 });
  } catch (error) {
    // Return a user-friendly error message
    return NextResponse.json(
      { error: 'Student with this ID already exists.' },
      { status: 500 }
    );
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
