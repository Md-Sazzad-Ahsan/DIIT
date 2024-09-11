import mongoose from 'mongoose';

// Define the schema for individual student's performance in a course
const performanceSchema = new mongoose.Schema({
  courseCode: { type: String, required: true }, // Reference to the course by courseCode
  present: { type: Number, default: 0 }, // Number of classes attended
  midTerm: { type: Number, default: 0 }, // Mid-term marks
  termFinal: { type: Number, default: 0 }, // Final term marks
  incourse: { type: Number, default: 0 } // In-course marks
});

// Define the schema for student details within a semester
const studentDetailsSchema = new mongoose.Schema({
  studentId: { type: Number, required: true }, // Student ID
  performance: [performanceSchema] // List of performance records for this student
});

// Define the schema for semester data
const semesterSchema = new mongoose.Schema({
  semesterName: { type: String, required: true }, // Example: 'FirstSemester'
  studentsDetails: [studentDetailsSchema] // List of student performance details for this semester
});

// Define the schema for batch performance data
const batchPerformanceSchema = new mongoose.Schema({
  batchName: { type: String, required: true }, // Example: 'CSE20'
  semesters: [semesterSchema] // List of semesters and their associated student performance data
});

// Dynamic model for student performance in each batch (e.g., CSE20_Performance)
export function getBatchPerformanceModel(batch) {
  const collectionName = `${batch.replace(' ', '_')}_Performance`;
  return mongoose.models[collectionName] || mongoose.model(collectionName, batchPerformanceSchema, collectionName);
}
