import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri ='mongodb://localhost:27017/dbconnect';

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully with Mongoose');
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};
