import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
  semesterName: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

export const Semester = mongoose.model('Semester', semesterSchema);
