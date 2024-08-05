import { Request, Response } from 'express';
import asyncWrapper from '../utils/asyncWrapper';
import CacheService from '../services/redis/CacheService';
import CryptarithmService from '../services/CryptarithmService';

const cacheService = CacheService.getInstance();
const cryptarithmService = CryptarithmService.getInstance();

const solve = asyncWrapper(
  async (
    req: Request<unknown, unknown, { equation: string }>,
    res: Response,
  ) => {
    const equation = req.body.equation.replace(/\s+/g, '');

    let isCached: boolean = true;
    let result: object = {};

    // Retrieve result from cache
    const cachedResult = await cacheService.get(`solve:${equation}`);
    if (cachedResult) {
      result = JSON.parse(cachedResult) as object;
    }

    if (Object.keys(result).length === 0) {
      // Solve the equation and cache the result
      result = cryptarithmService.solve(equation);
      await cacheService.set(`solve:${equation}`, JSON.stringify(result));
      isCached = false;
    }

    if (isCached) {
      res.set('X-Data-Source', 'cache');
    }

    if ('error' in result) {
      return res.status(400).json({ error: result.error });
    }

    // Return a response with solutions
    return res.status(200).json({
      data: {
        ...result,
      },
    });
  },
);

export default { solve };
