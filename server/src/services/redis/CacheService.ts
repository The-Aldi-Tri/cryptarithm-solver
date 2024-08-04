import { createClient, RedisClientType } from 'redis';
import config from '../../configs/config';

// Doc: https://www.npmjs.com/package/redis
class CacheService {
  private _client: RedisClientType;
  constructor(db: number = 0) {
    this._client = createClient({
      url: `redis://${config.redis.host}:${String(config.redis.port)}`,
    });

    this._client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    void this._client.connect();

    void this._client.select(db);
  }

  async set(
    key: string,
    value: string,
    expirationInSecond: number | null = null,
  ) {
    if (expirationInSecond) {
      await this._client.set(key, value, {
        EX: expirationInSecond,
      });
    } else {
      await this._client.set(key, value);
    }
  }

  async get(key: string) {
    return await this._client.get(key);
  }

  async delete(key: string) {
    return this._client.del(key);
  }

  async close() {
    await this._client.disconnect();
  }
}

export default CacheService;
