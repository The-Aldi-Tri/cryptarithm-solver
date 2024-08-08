import { createClient, RedisClientType } from 'redis';
import config from '../../configs/config';
import logger from '../../logger';

// Doc: https://www.npmjs.com/package/redis
class CacheService {
  private client: RedisClientType;
  private static instance: CacheService;

  private constructor() {
    this.client = createClient({
      url: `redis://${config.redis.host}:${String(config.redis.port)}`,
    });

    this.client.on('error', (err) => {
      logger.error('Redis Client - An error has occurred:', err);
    });
    this.client.on('connect', () => {
      logger.info('Redis Client - Initiating a connection to the server.');
    });
    this.client.on('ready', () => {
      logger.info('Redis Client - Successfully connected and ready to use.');
    });
    this.client.on('end', () => {
      logger.info('Redis Client - Connection has been closed.');
    });
    this.client.on('reconnecting', () => {
      logger.warn('Redis Client - Trying to reconnect to the server.');
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.quit();
  }

  public async set(
    key: string,
    value: string,
    expirationInSecond: number | null = null,
  ): Promise<void> {
    if (expirationInSecond) {
      await this.client.set(key, value, {
        EX: expirationInSecond,
      });
    } else {
      await this.client.set(key, value);
    }
  }

  public async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async changeDb(db: number): Promise<void> {
    await this.client.select(db);
  }

  public async flushDb(): Promise<void> {
    await this.client.flushDb();
  }
}

export default CacheService;
