require("dotenv").config(); // Load environment variables

module.exports = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  redis: {
    host: process.env.REDIS_SERVER,
    port: process.env.REDIS_PORT,
  },
};
