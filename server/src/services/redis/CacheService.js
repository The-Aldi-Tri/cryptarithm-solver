const redis = require("redis");
const config = require("../../configs/config");

class CacheService {
  constructor(db = 0) {
    this._client = redis.createClient({
      url: `redis://${config.redis.host}:${config.redis.port}`,
    });

    this._client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    this._client.on("connect", () => {
      // console.log("Connected to Redis");
    });

    this._client.connect(); // Connect to Redis server

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
}

module.exports = CacheService;
