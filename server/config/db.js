import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not configured');
    }

    await mongoose.connect(process.env.MONGO_URI); // No options needed
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDB;
