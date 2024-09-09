import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db'; // Ensure this path is correct
import generateUniqueRegistration from '@/utils/generateUniqueRegistration';
import { getStudentModel } from '@/models/Student'; // Ensure this path is correct

// Connect to MongoDB
async function getDatabase() {
  await dbConnect();
}

export async function GET(request) {
  await getDatabase();

  try {
    const url = new URL(request.url);
    const studentID = url.searchParams.get('studentID')?.trim();
    const batch = url.searchParams.get('batch')?.trim(); 

    // console.log('Extracted studentID:', studentID);
    // console.log('Extracted batch:', batch); 

    if (!studentID || !batch) {
      return NextResponse.json({ error: 'StudentID and Batch are required' }, { status: 400 });
    }

    const Student = getStudentModel(batch);

    // Query by StudentID
    const student = await Student.findOne({ StudentID: studentID });

    if (!student) {
      return NextResponse.json({ error:'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ student }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving student:', error.message, error.stack); // Detailed error logging
    return NextResponse.json({ error: `An error occurred while retrieving the student: ${error.message}` }, { status: 500 });
  }
}



// POST a new student
export async function POST(request) {
  await getDatabase();

  try {
    const data = await request.json();
    const { StudentID, email, phoneNumber, batch } = data;

    if (!StudentID || !email || !phoneNumber || !batch) {
      return NextResponse.json(
        { error: 'StudentID, Email, Phone Number, and Batch are required' },
        { status: 400 }
      );
    }

    const Student = getStudentModel(batch);

    const existingStudentByID = await Student.findOne({ StudentID });
    if (existingStudentByID) {
      return NextResponse.json(
        { error: 'Student with this ID already exists in this batch.' },
        { status: 409 }
      );
    }

    const existingStudentByEmail = await Student.findOne({ email });
    if (existingStudentByEmail) {
      return NextResponse.json(
        { error: 'Student with this email already exists in this batch.' },
        { status: 409 }
      );
    }

    const existingStudentByPhone = await Student.findOne({ phoneNumber });
    if (existingStudentByPhone) {
      return NextResponse.json(
        { error: 'Student with this phone number already exists in this batch.' },
        { status: 409 }
      );
    }

    const registration = generateUniqueRegistration();

    const student = new Student({ ...data, registration });
    await student.save();

    return NextResponse.json(
      { message: 'Student added successfully', student },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { error: `An unexpected error occurred. Please try again. Details: ${error.message}` },
      { status: 500 }
    );
  }
}

// PUT (update) a student
export async function PUT(request) {
  await getDatabase();

  try {
    const data = await request.json();
    const { StudentID, _id, batch, phoneNumber, email } = data;

    if (!StudentID || !_id || !batch) {
      return NextResponse.json({ error: 'StudentID, _id, and Batch are required for updating the student' }, { status: 400 });
    }

    const Student = getStudentModel(batch);

    const existingStudent = await Student.findById(_id);
    if (!existingStudent) {
      return NextResponse.json({ error: 'Student not found with the provided ID in this batch' }, { status: 404 });
    }

    const duplicatePhone = await Student.findOne({ phoneNumber, _id: { $ne: _id } });
    if (duplicatePhone) {
      return NextResponse.json({ error: 'Phone number is already in use by another student in this batch' }, { status: 409 });
    }

    const duplicateEmail = await Student.findOne({ email, _id: { $ne: _id } });
    if (duplicateEmail) {
      return NextResponse.json({ error: 'Email is already in use by another student in this batch' }, { status: 409 });
    }

    const updatedStudent = await Student.findByIdAndUpdate(_id, data, { new: true, runValidators: true });

    return NextResponse.json({ message: 'Student updated successfully', student: updatedStudent }, { status: 200 });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: 'An error occurred while updating the student.' }, { status: 500 });
  }
}

// DELETE a student
export async function DELETE(request) {
  await getDatabase();

  try {
    const data = await request.json();
    const { StudentID, batch } = data;

    if (!StudentID || !batch) {
      return NextResponse.json({ error: 'StudentID and Batch are required for deletion' }, { status: 400 });
    }

    const Student = getStudentModel(batch);

    const student = await Student.findOneAndDelete({ StudentID });

    if (!student) {
      return NextResponse.json({ error: 'Student not found in this batch' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: 'An error occurred while deleting the student.' }, { status: 500 });
  }
}
