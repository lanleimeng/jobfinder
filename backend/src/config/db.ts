import mongoose from 'mongoose';
import config from './config';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection failed: ${(err as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
