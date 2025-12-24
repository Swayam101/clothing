import mongoose from 'mongoose';
import config from './index';

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!config.database.url) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    await mongoose.connect(config.database.url);
    console.log('✅ Database connected successfully');

    mongoose.connection.on('error', (error) => {
      console.error('❌ Database connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Database disconnected');
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
};

