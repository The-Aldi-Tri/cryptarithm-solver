import { Request, Response } from 'express';
import logger from '../logger';

const errorHandler = (err: unknown, req: Request, res: Response) => {
  logger.error('Unexpected error occurred: ', err);
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
