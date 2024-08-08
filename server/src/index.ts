import app from './app';
import config from './configs/config';
import CacheService from './services/redis/CacheService';
import logger from './logger';
import { Server } from 'http';

const cacheService = CacheService.getInstance();
let server: Server;

const setupRedisConnection = async () => {
  await cacheService.connect();
};

const startServer = () => {
  server = app.listen(config.app.port, config.app.host, () => {
    logger.info(
      `Server is listening on http://${config.app.host}:${String(config.app.port)}`,
    );
  });
};

const startApp = async () => {
  logger.info('Starting up app...');
  await setupRedisConnection();
  startServer();
};

void startApp();

const stopServer = () => {
  return new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) {
        logger.error('Error closing server:', err);
        return reject(err);
      }
      logger.info('Server closed.');
      resolve();
    });
  });
};

const closeRedisConnection = async () => {
  logger.info('Closing Redis connection...');
  await cacheService.disconnect();
};

const shutdown = async () => {
  logger.info('Received shutdown signal. Closing app gracefully...');
  await stopServer();
  await closeRedisConnection();
};

process.on('SIGINT', () => {
  shutdown()
    .then(() => {
      logger.info('Shutdown success.');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Unhandled error during shutdown:', error);
      process.exit(1);
    });
});
process.on('SIGTERM', () => {
  shutdown()
    .then(() => {
      logger.info('Shutdown success.');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Unhandled error during shutdown:', error);
      process.exit(1);
    });
});
