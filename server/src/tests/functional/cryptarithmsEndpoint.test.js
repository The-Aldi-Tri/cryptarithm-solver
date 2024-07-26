const request = require("supertest");
const app = require("../..//app");

describe("POST /api/endpoint", () => {
  it("should return a 422 status when no payload is provided or in wrong format", async () => {
    const wrongPayload = {
      equation: "SEND + MORE = MONEY",
    };
    const response = await request(app).post("/cryptarithms").send();
    expect(response.statusCode).toBe(422);
  });
});
