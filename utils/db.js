import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);  // Removed deprecated options
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Couldn't connect to MongoDB");
  }
};

export default connect;
