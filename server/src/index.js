require("dotenv").config(); // Load environment variables
const app = require("./app");

// Config
const config = require("./configs/config");

// Server listening
const server = app.listen(config.app.port, config.app.host, () => {
  console.info(
    `Server is listening on http://${config.app.host}:${config.app.port}`
  );
});

const shutdown = () => {
  console.log("Received shutdown signal. Closing server gracefully...");

  server.close(() => {
    console.log("All requests have been processed. Server closed.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forcing server shutdown...");
    process.exit(1);
  }, 10000); // Timeout in milliseconds
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
