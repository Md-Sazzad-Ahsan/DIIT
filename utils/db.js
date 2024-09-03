import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connect = async () => {
  // Check if already connected to avoid multiple connections
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  // Validate the MONGO_URI environment variable
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI environment variable is not set");
    throw new Error("MONGO_URI environment variable is not set");
  }

  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Couldn't connect to MongoDB");
  }
};

export default connect;
