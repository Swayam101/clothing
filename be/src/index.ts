import app from './app';
import config from './config';
import { connectDatabase } from './config/database';
import { initializeFirebase } from './config/firebase';

const startServer = async (): Promise<void> => {
  try {
    // Initialize Firebase Admin SDK
    initializeFirebase();
    console.log('🔥 Firebase Admin SDK initialized');

    // Connect to database
    await connectDatabase();

    const server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(`🔗 Health check: http://localhost:${config.port}/health`);
    });

    const gracefulShutdown = async (signal: string) => {
      console.log(`\n${signal} received, starting graceful shutdown...`);

      server.close(async () => {
        console.log('HTTP server closed');

        const { disconnectDatabase } = await import('./config/database');
        await disconnectDatabase();

        console.log('Graceful shutdown completed');
        process.exit(0);
      });

      setTimeout(() => {
        console.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

