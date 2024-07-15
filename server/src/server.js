require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Middlewares
const apiLimiter = require("./middlewares/apiLimiter");
const errorHandler = require("./middlewares/errorHandler");

// Config
const config = require("./config/config");

// Routes
const cryptarithmRouter = require("./routes/cryptarithmsRoutes");

const app = express();

// Request body parser using built-in
app.use(express.json()); // Parse JSON bodies

// Helps secure app by setting HTTP response headers.
app.use(helmet());

// Handle cross-origin requests
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: ["http://localhost:3000"], // Allow requests from specific origin
      credentials: true, // Allow credentials (cookies, authorization headers)
    })
  );
}

// Apply rate limit to api routes
app.use("/api", apiLimiter);

// Mount routes
app.use(cryptarithmRouter);

// Middleware to handle invalid/not defined routes
app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

// Handle errors
app.use(errorHandler);

// Server
app.listen(config.app.port, config.app.host, () => {
  console.info(
    `Server is listening on http://${config.app.host}:${config.app.port}`
  );
});
