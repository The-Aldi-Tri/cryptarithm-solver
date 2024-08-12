import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import logger from './logger';
import { v7 as uuidV7 } from 'uuid';

// Middlewares
import apiLimiter from './middlewares/apiLimiter';
import errorHandler from './middlewares/errorHandler';

// Routes
import cryptarithmRouter from './routes/cryptarithmsRoutes';

const app: express.Application = express();

// Request body parser using built-in
app.use(express.json()); // Parse JSON bodies

// Helps secure app by setting HTTP response headers.
app.use(helmet());

// Handle cross-origin requests
app.use(cors());

app.use(
  (req: express.Request<unknown, unknown, { equation: string }>, res, next) => {
    const reqId = uuidV7();
    const start = Date.now();
    const { method, url, body } = req;
    logger.info(
      `Incoming request (${reqId}): ${method} ${url} ${body.equation ?? 'N/A'}`,
    );

    res.on('finish', () => {
      logger.info(
        `Returning response (${reqId}): ${res.statusCode} ${Date.now() - start}ms`,
      );
    });

    next();
  },
);

// Apply rate limit to api routes
app.use('/api/cryptarithms', apiLimiter);

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
