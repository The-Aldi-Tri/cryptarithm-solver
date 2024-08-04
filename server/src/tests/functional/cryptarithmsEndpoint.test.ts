import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../app';
import { cacheService } from '../../services/instanceOfServices';

type SolutionMap = { [key: string]: number };

interface responseSuccess {
  data: {
    solutions: SolutionMap[];
    noLeadingZeroSolutions: SolutionMap[];
  };
}

interface responseError {
  error: string;
}

describe('POST /cryptarithms', () => {
  beforeAll(async () => {
    await cacheService.changeDb(6);
    await cacheService.flushDb();
  });

  afterAll(async () => {
    await cacheService.flushDb();
    await cacheService.close();
  });

  it('should return a 422 status when payload is not provided', async () => {
    const response = await request(app).post('/cryptarithms').send();

    const body = response.body as responseError;

    expect(response.statusCode).toBe(422);
    expect(body).toHaveProperty('error', '"equation" is required');
  });

  it('should return a 422 status when payload is in wrong format', async () => {
    const wrongPayload = { equation: 'SEND + MORE = MONEY $$$' };
    const response = await request(app)
      .post('/cryptarithms')
      .send(wrongPayload);

    const body = response.body as responseError;

    expect(response.statusCode).toBe(422);
    expect(body).toHaveProperty('error');
  });

  it('should return a 400 status when unique letter > 10', async () => {
    const wrongPayload = { equation: 'SENDXFT + MOREQERT = MONEYNHJK' };
    const response = await request(app)
      .post('/cryptarithms')
      .send(wrongPayload);

    const body = response.body as responseError;

    expect(response.statusCode).toBe(400);
    expect(body).toHaveProperty(
      'error',
      'Not solvable because unique letters are more than 10',
    );
  });

  it(
    'should return a 200 status when payload is correct',
    async () => {
      const correctPayload = { equation: 'SEND + MORE = MONEY' };
      const response = await request(app)
        .post('/cryptarithms')
        .send(correctPayload);

      const body = response.body as responseSuccess;

      expect(response.statusCode).toBe(200);
      expect(body.data).toHaveProperty('solutions');
      expect(body.data).toHaveProperty('noLeadingZeroSolutions');
    },
    1 * 60 * 1000,
  );

  it('should return a 200 status and fast response time when using cache', async () => {
    const correctPayload = { equation: 'SEND + MORE = MONEY' };
    const response = await request(app)
      .post('/cryptarithms')
      .send(correctPayload);

    const body = response.body as responseSuccess;

    expect(response.statusCode).toBe(200);
    expect(body.data).toHaveProperty('solutions');
    expect(body.data).toHaveProperty('noLeadingZeroSolutions');
    expect(response.headers).toHaveProperty('x-data-source', 'cache');
  }, 100);
});
