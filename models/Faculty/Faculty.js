import { Schema, model, models } from 'mongoose';

const FacultySchema = new Schema({
  facultyId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  assignedTo: { type: String, required: false, unique: true }, // to set Batch Co-Ordinator
  hashedPIN: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

export default models.Faculty || model('Faculty', FacultySchema);
