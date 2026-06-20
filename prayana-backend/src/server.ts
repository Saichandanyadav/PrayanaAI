import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDatabase } from './config/db';

const PORT = process.env.PORT || 5001;

const bootSystem = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Prayana AI Engine running in production context on port ${PORT}`);
  });
};

bootSystem();