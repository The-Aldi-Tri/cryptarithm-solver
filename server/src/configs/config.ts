import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

interface AppConfig {
  host: string;
  port: number;
}

interface RedisConfig {
  host: string;
  port: number;
}

interface Config {
  app: AppConfig;
  redis: RedisConfig;
}

const config: Config = {
  app: {
    host: process.env.HOST ? process.env.HOST : '127.0.0.1',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  },
  redis: {
    host: process.env.REDIS_SERVER ? process.env.REDIS_SERVER : 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  },
};

export default config;
