// models/Student.js
import mongoose from 'mongoose';

// Define the Student Schema
const studentSchema = new mongoose.Schema({
  StudentID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: false,
  },
});


const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
