import CacheService from './redis/CacheService';
const cacheService = new CacheService();

import CryptarithmService from './CryptarithmService';
const cryptarithmService = new CryptarithmService();

export { cacheService, cryptarithmService };
