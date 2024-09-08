import { Schema, model } from 'mongoose';

const studentsSchema = new Schema({
  batch: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    required: true,
    enum: ['First', 'Second', 'Third','Fourth', 'Fifth','Sixth','Seventh','Eighth']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjects: [
    {
      name: {
        type: String,
        required: false
      },
      marks: [
        {
          obtainedMarks: {
            type: Number,
            required: false,
            min: 0,
            max: 100
          },
          GPA: {
            type: String,
            required: false,
          },
          attendance: {
            type: Number,
            required: false,
            min: 0,
            max: 100
          }
        }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model.Students || mongoose.model('Students', studentsSchema);