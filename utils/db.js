import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);  // Debugging line
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
