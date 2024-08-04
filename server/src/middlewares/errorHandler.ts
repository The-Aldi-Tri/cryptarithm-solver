import { Request, Response } from 'express';

const errorHandler = (err: unknown, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
