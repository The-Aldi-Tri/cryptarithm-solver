import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

// Middlewares
import apiLimiter from './middlewares/apiLimiter';
import errorHandler from './middlewares/errorHandler';

// Routes
import cryptarithmRouter from './routes/cryptarithmsRoutes';

const app: Application = express();

// Request body parser using built-in
app.use(express.json()); // Parse JSON bodies

// Helps secure app by setting HTTP response headers.
app.use(helmet());

// Handle cross-origin requests
app.use(cors());
// if (process.env.NODE_ENV === "development") {
//   app.use(
//     cors({
//       origin: ["http://localhost:3000"], // Allow requests from specific origin
//       credentials: true, // Allow credentials (cookies, authorization headers)
//     })
//   );
// }

// Apply rate limit to api routes
app.use('/cryptarithms', apiLimiter);

// Mount routes
app.use(cryptarithmRouter);

// Serve Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware to handle invalid/not defined routes
app.use((req, res) => {
  return res.status(404).json({ error: 'Route not found' });
});

// Handle errors
app.use(errorHandler);

export default app;
