import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

import app from './app';

// Config
import config from './configs/config';

// Server listening
const server = app.listen(config.app.port, config.app.host, () => {
  console.info(
    `Server is listening on http://${config.app.host}:${String(config.app.port)}`,
  );
});

const shutdown = () => {
  console.log('Received shutdown signal. Closing server gracefully...');

  server.close(() => {
    console.log('All requests have been processed. Server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forcing server shutdown...');
    process.exit(1);
  }, 10000); // Timeout in milliseconds
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
