const compression = require('compression');
const { promisify } = require('util');
const redis = require('../config/redis');

module.exports = (app) => {
  // Compress responses
  app.use(compression());

  // Cache middleware
  const cache = async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    const cachedResponse = await redis.get(key);

    if (cachedResponse) {
      return res.json(JSON.parse(cachedResponse));
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      redis.setex(key, 3600, JSON.stringify(body));
      res.sendResponse(body);
    };

    next();
  };

  // Memory usage monitoring
  const monitorMemory = (req, res, next) => {
    const used = process.memoryUsage();
    console.log({
      rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
      heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
      heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
      external: `${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`,
    });
    next();
  };

  return {
    cache,
    monitorMemory
  };
}; 