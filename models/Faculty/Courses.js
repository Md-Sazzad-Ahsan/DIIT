import mongoose from 'mongoose';

// Define the schema for a Course
const courseSchema = new mongoose.Schema({
  semesterName: { type: String, required: true }, // Example: 'FirstSemester'
  courses: [{
    CourseName: { type: String, required: true }, // Example: 'Compiler Design'
    CourseCode: { type: String, required: true, unique: true }, // Unique code for the Course
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', default: null }, // Faculty ID, optional
    totalClasses: { type: Number, default: 0 } // Total number of classes
  }]
});

// Define the schema for batch courses data
const batchCoursesSchema = new mongoose.Schema({
  batchName: { type: String, required: true }, // Example: 'CSE20'
  semesters: [courseSchema] // List of semesters and their courses
});

// Dynamic model for courses in each batch (e.g., CSE20_courses)
export function getBatchCoursesModel(batch) {
  const collectionName = `${batch.replace(' ', '_')}_courses`;
  return mongoose.models[collectionName] || mongoose.model(collectionName, batchCoursesSchema, collectionName);
}
