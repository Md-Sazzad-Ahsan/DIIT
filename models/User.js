import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,  // Change 'string' to String
      required: true,
      unique: true,
    },
    password: {
      type: String,  // Change 'string' to String
      required: true, // Consider making password required
    },
    isAdmin: {
      type: Boolean,
      default: false,  // Default is false; only set true for admin users
    },
  },
  { timestamps: true }
);

// To prevent model compilation errors in Next.js when in development mode
export default mongoose.models.User || mongoose.model("User", userSchema);
