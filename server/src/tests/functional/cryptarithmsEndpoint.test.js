const request = require("supertest");
const app = require("../../app");
const CacheService = require("../../services/redis/CacheService");

describe("POST /cryptarithms", () => {
  let cacheService;

  beforeAll(async () => {
    cacheService = new CacheService();
    await cacheService.delete(`solutions:SEND + MORE = MONEY-true`);
  });

  afterAll(async () => {
    await cacheService.delete(`solutions:SEND + MORE = MONEY-true`);
    await cacheService._client.quit();
  });

  it("should return a 422 status when payload is not provided", async () => {
    const response = await request(app).post("/cryptarithms").send();
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("error", '"equation" is required');
  });

  it("should return a 422 status when payload is in wrong format", async () => {
    const wrongPayload = {
      equation: "SEND + MORE = MONEY",
    };
    const response = await request(app)
      .post("/cryptarithms")
      .send(wrongPayload);
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty(
      "error",
      '"allowLeadingZero" is required'
    );
  });

  it("should return a 400 status when unique letter > 10", async () => {
    const wrongPayload = {
      equation: "SENDXFT + MOREQERT = MONEYNHJK",
      allowLeadingZero: true,
    };
    const response = await request(app)
      .post("/cryptarithms")
      .send(wrongPayload);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Not solvable because unique letters are more than 10"
    );
  });

  it(
    "should return a 200 status when payload is correct",
    async () => {
      const correctPayload = {
        equation: "SEND + MORE = MONEY",
        allowLeadingZero: true,
      };
      const response = await request(app)
        .post("/cryptarithms")
        .send(correctPayload);
      expect(response.statusCode).toBe(200);
      expect(response.body.data.solutions).toBeInstanceOf(Array);
    },
    60 * 1000
  );

  it(
    "should return a 200 status and fast response time when using cache",
    async () => {
      const correctPayload = {
        equation: "SEND + MORE = MONEY",
        allowLeadingZero: true,
      };
      const response = await request(app)
        .post("/cryptarithms")
        .send(correctPayload);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.solutions).toBeInstanceOf(Array);
      expect(response.headers).toHaveProperty("x-data-source", "cache");
    },
    1 * 1000
  );
});
