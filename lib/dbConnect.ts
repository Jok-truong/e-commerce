import mongoose from "mongoose";

export const connectDB = async () => {
  //check if mongoose is already connected
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  await mongoose.connect(process.env.MONGO_URL as string);
  console.log("Connected to MongoDB");
};
