const CacheService = require("./redis/CacheService");
const cacheService = new CacheService();

const CryptarithmService = require("./CryptarithmService");
const cryptarithmService = new CryptarithmService();

module.exports = { cacheService, cryptarithmService };
