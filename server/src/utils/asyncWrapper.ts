import { Request, Response, NextFunction } from 'express';

const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: unknown) => {
      // Handle the error in a type-safe manner
      if (err instanceof Error) {
        next(err);
      } else {
        // For unknown errors, create a generic error
        next(new Error('An unknown error occurred'));
      }
    });
  };
};

export default asyncWrapper;
