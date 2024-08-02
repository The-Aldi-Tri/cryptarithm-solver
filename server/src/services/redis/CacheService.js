const { createClient } = require("redis");
const config = require("../../configs/config");

// Doc: https://www.npmjs.com/package/redis
class CacheService {
  constructor(db = 0) {
    this._client = createClient({
      url: `redis://${config.redis.host}:${config.redis.port}`,
    });

    this._client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    this._client.connect();

    this._client.select(db);
  }

  async set(key, value, expirationInSecond = null) {
    if (expirationInSecond) {
      await this._client.set(key, value, {
        EX: expirationInSecond,
      });
    } else {
      await this._client.set(key, value);
    }
  }

  async get(key) {
    return await this._client.get(key);
  }

  async delete(key) {
    return this._client.del(key);
  }

  async close() {
    await this._client.disconnect();
  }
}

module.exports = CacheService;
