const redis = require("redis");
const config = require("../../configs/config");

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: config.redis.host,
      },
    });

    this._client.on("error", (error) => {
      console.error(error);
    });

    this._client.connect();
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

  delete(key) {
    return this._client.del(key);
  }
}

const cacheService = new CacheService();

module.exports = cacheService;
