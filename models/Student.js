// models/Student.js
import mongoose from 'mongoose';

// Define the Student Schema
const studentSchema = new mongoose.Schema({
  StudentID: {
    type: Number,
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
  registration:{
    type:String,
    unique: true,
    required: false,
    default: '',
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: false,
    default:'./userDemo.jpg',
  },
});


const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
