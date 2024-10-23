import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
  batchName: { type: String, required: true },
  semesters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Semester' }]
});

export const Batch = mongoose.model('Batch', batchSchema);
