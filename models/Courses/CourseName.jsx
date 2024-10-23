import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true }
});

const semesterSchema = new mongoose.Schema({
  runningBatch: { type: String, default: '' },
  courses: [courseSchema]
});

const coursesSchema = new mongoose.Schema({}, { strict: false }); // Allows for dynamic keys

const Courses = mongoose.model('Courses', coursesSchema);

export { Courses };
