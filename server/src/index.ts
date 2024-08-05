import app from './app';
import config from './configs/config';
import CacheService from './services/redis/CacheService';

const cacheService = CacheService.getInstance();

// Set redis connection
cacheService
  .connect()
  .then(() => console.log('Successfully connected to Redis'))
  .catch(() => console.error('Error when setting up redis connection'));

// Start Server
const server = app.listen(config.app.port, config.app.host, () => {
  console.info(
    `Server is listening on http://${config.app.host}:${String(config.app.port)}`,
  );
});

const shutdown = async () => {
  console.log('Received shutdown signal. Closing server gracefully...');

  try {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.error('Error occurred while closing the server:', err);
          reject(err);
        } else {
          console.log('All requests have been processed. Server closed.');
          resolve();
        }
      });
    });

    await cacheService.disconnect();
    console.log('Successfully disconnected from Redis');

    console.log('Shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('Shutdown failed:', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  shutdown().catch((error) => {
    console.error('Unhandled error during shutdown:', error);
    process.exit(1);
  });
});
process.on('SIGTERM', () => {
  shutdown().catch((error) => {
    console.error('Unhandled error during shutdown:', error);
    process.exit(1);
  });
});
