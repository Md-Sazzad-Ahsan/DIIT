import mongoose from 'mongoose';

// Define the schema for a Course
const courseSchema = new mongoose.Schema({
  semesterName: { type: String, required: true }, 
  courses: [{
    CourseName: { type: String, required: true },
    CourseCode: { type: String, required: true, unique: true },
    facultyId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Faculty', // Reference the Faculty model
      required: true 
    }, 
    totalClasses: { type: Number, default: 0 }
  }]
});

// Define the schema for batch courses data
const batchCoursesSchema = new mongoose.Schema({
  batchName: { type: String, required: true },
  semesters: [courseSchema]
});

// Dynamic model for courses in each batch
export function getBatchCoursesModel(batch) {
  const collectionName = `${batch.replace(' ', '_')}_courses`;
  return mongoose.models[collectionName] || mongoose.model(collectionName, batchCoursesSchema, collectionName);
}
