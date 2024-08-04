/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../app';
import { cacheService } from '../../services/instanceOfServices';

describe('POST /cryptarithms', () => {
  beforeAll(async () => {
    await cacheService.delete(`solve:SEND + MORE = MONEY`);
  });

  afterAll(async () => {
    await cacheService.delete(`solve:SEND + MORE = MONEY`);
    await cacheService.close();
  });

  it('should return a 422 status when payload is not provided', async () => {
    const response = await request(app).post('/cryptarithms').send();

    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty('error', '"equation" is required');
  });

  it('should return a 422 status when payload is in wrong format', async () => {
    const wrongPayload = { equation: 'SEND + MORE = MONEY $$$' };
    const response = await request(app)
      .post('/cryptarithms')
      .send(wrongPayload);

    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty('error');
  });

  it('should return a 400 status when unique letter > 10', async () => {
    const wrongPayload = { equation: 'SENDXFT + MOREQERT = MONEYNHJK' };
    const response = await request(app)
      .post('/cryptarithms')
      .send(wrongPayload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      'Not solvable because unique letters are more than 10',
    );
  });

  it('should return a 200 status when payload is correct', async () => {
    const correctPayload = { equation: 'SEND + MORE = MONEY' };
    const response = await request(app)
      .post('/cryptarithms')
      .send(correctPayload);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty('solutions');
    expect(response.body.data).toHaveProperty('noLeadingZeroSolutions');
  });

  it('should return a 200 status and fast response time when using cache', async () => {
    const correctPayload = { equation: 'SEND + MORE = MONEY' };
    const response = await request(app)
      .post('/cryptarithms')
      .send(correctPayload);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty('solutions');
    expect(response.body.data).toHaveProperty('noLeadingZeroSolutions');
    expect(response.headers).toHaveProperty('x-data-source', 'cache');
  }, 100);
});
