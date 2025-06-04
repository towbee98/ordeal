import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-dealership';
    await mongoose.connect(mongoURI);
    logger.info('MongoDB Connected...');
  } catch (err) {
    if (err instanceof Error) {
      logger.error('MongoDB connection error:', err.message);
    }
    process.exit(1);
  }
};

export default connectDB; 