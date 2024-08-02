const CacheService = require("../../services/redis/CacheService");

describe("CacheService with real Redis connection", () => {
  let cacheService;

  beforeAll(() => {
    cacheService = new CacheService(1);
  });

  afterAll(async () => {
    await cacheService._client.flushDb();
    await cacheService.close();
  });

  it("should set a value in the cache without expiration", async () => {
    const key = "testKey";
    const value = "testValue";

    await cacheService.set(key, value);
    const result = await cacheService.get(key);

    expect(result).toBe(value);
  });

  it("should get a value from the cache", async () => {
    const key = "testKey";
    const value = "testValue";

    await cacheService.set(key, value);
    const result = await cacheService.get(key);

    expect(result).toBe(value);
  });

  it("should set a value in the cache with expiration", async () => {
    const key = "testKey";
    const value = "testValue";
    const expirationInSecond = 3;

    await cacheService.set(key, value, expirationInSecond);

    let result;
    result = await cacheService.get(key);
    expect(result).toBe(value);
    await new Promise((resolve) =>
      setTimeout(resolve, (expirationInSecond + 1) * 1000)
    );
    result = await cacheService.get(key);
    expect(result).toBeNull();
  });

  it("should delete a value from the cache", async () => {
    const key = "testKey";

    await cacheService.set(key, "someValue");
    await cacheService.delete(key);
    const result = await cacheService.get(key);

    expect(result).toBeNull();
  });

  it("should handle redis errors", async () => {
    // Mock error handling directly in the CacheService if needed
    // For example, simulate an error in the `set` method
    await expect(cacheService.set(null, "value")).rejects.toThrow();
  });
});
