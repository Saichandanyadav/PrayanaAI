import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is missing.');
    }
    
    await mongoose.connect(mongoUri);
    console.log('🛡️  MongoDB connection fully established.');
  } catch (error) {
    console.error('❌ Database connection failure:', error);
    process.exit(1);
  }
};