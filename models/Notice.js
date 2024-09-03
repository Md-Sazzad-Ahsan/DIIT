import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },  // Automatically set creation date
  postTime: { type: Date, default:Date.now },  // Store formatted date and time
  creator: { type: String, default: 'DIIT' }  // Default creator
});

export default mongoose.models.Notice || mongoose.model('Notice', noticeSchema);
