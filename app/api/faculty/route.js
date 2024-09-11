import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db'; // Correctly import the dbConnect function
import Faculty from '@/models/Faculty/Faculty'; // Adjust the path if necessary
import bcrypt from 'bcrypt'; // Import bcrypt for hashing

const SALT_ROUNDS = 10; // Define salt rounds for bcrypt hashing

// Handle POST request - Add Faculty
export async function POST(request) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    const { facultyId, name, email, isAdmin, assignedTo, hashedPIN } = await request.json();

    // Hash the PIN before saving
    const hashedPassword = await bcrypt.hash(hashedPIN, SALT_ROUNDS);

    // Create a new faculty instance with hashedPIN
    const newFaculty = new Faculty({
      facultyId,
      name,
      email,
      isAdmin,
      assignedTo,
      hashedPIN: hashedPassword // Store the hashed password
    });

    // Save the faculty member
    await newFaculty.save();

    return NextResponse.json({ message: 'Faculty added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding faculty:', error);
    return NextResponse.json({ error: 'An error occurred while adding the faculty' }, { status: 500 });
  }
}

// Handle GET request - Fetch all faculty or one by ID
export async function GET(request) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get('facultyId'); // Get faculty by id if provided

    if (facultyId) {
      // Fetch specific faculty by facultyId
      const faculty = await Faculty.findOne({ facultyId });
      if (!faculty) {
        return NextResponse.json({ error: 'Faculty not found' }, { status: 404 });
      }
      return NextResponse.json(faculty, { status: 200 });
    } else {
      // Fetch all faculties
      const faculties = await Faculty.find();
      return NextResponse.json(faculties, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching faculties:', error);
    return NextResponse.json({ error: 'An error occurred while fetching faculties' }, { status: 500 });
  }
}

// Handle PUT request - Update faculty
export async function PUT(request) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    const { facultyId, name, email, isAdmin, assignedTo, hashedPIN } = await request.json();

    // Hash the PIN before updating if it's provided
    let updatedFields = { name, email, isAdmin, assignedTo };
    if (hashedPIN) {
      const hashedPassword = await bcrypt.hash(hashedPIN, SALT_ROUNDS);
      updatedFields.hashedPIN = hashedPassword; // Update with hashed password
    }

    // Find faculty by facultyId and update
    const updatedFaculty = await Faculty.findOneAndUpdate(
      { facultyId },
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedFaculty) {
      return NextResponse.json({ error: 'Faculty not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Faculty updated successfully', faculty: updatedFaculty }, { status: 200 });
  } catch (error) {
    console.error('Error updating faculty:', error);
    return NextResponse.json({ error: 'An error occurred while updating the faculty' }, { status: 500 });
  }
}

// Handle DELETE request - Remove faculty
export async function DELETE(request) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const facultyId = searchParams.get('facultyId'); // Identify faculty to be deleted

    if (!facultyId) {
      return NextResponse.json({ error: 'Faculty ID is required' }, { status: 400 });
    }

    const deletedFaculty = await Faculty.findOneAndDelete({ facultyId });

    if (!deletedFaculty) {
      return NextResponse.json({ error: 'Faculty not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Faculty deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting faculty:', error);
    return NextResponse.json({ error: 'An error occurred while deleting the faculty' }, { status: 500 });
  }
}
