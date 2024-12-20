const redis = require('../config/redis');

const cache = {
  // Cache middleware
  cacheMiddleware: (duration) => {
    return async (req, res, next) => {
      if (req.method !== 'GET') {
        return next();
      }

      const key = `cache:${req.originalUrl || req.url}`;

      try {
        const cachedResponse = await redis.get(key);
        
        if (cachedResponse) {
          return res.json(JSON.parse(cachedResponse));
        }

        // Modify res.json to cache the response
        const originalJson = res.json;
        res.json = function(body) {
          redis.setex(key, duration, JSON.stringify(body));
          return originalJson.call(this, body);
        };

        next();
      } catch (error) {
        console.error('Cache error:', error);
        next();
      }
    };
  },

  // Clear cache by pattern
  clearCache: async (pattern) => {
    try {
      const keys = await redis.keys(`cache:${pattern}`);
      if (keys.length > 0) {
        await redis.del(keys);
      }
    } catch (error) {
      console.error('Clear cache error:', error);
    }
  },

  // Cache specific routes
  routes: {
    properties: 300, // 5 minutes
    users: 600, // 10 minutes
    stats: 1800 // 30 minutes
  }
};

module.exports = cache; 