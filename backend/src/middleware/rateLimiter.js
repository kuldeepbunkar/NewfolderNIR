const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('../config/redis');

// Basic rate limiter
const createRateLimiter = (options = {}) => {
  return rateLimit({
    store: new RedisStore({
      client: redis,
      prefix: 'rate-limit:'
    }),
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes by default
    max: options.max || 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    ...options
  });
};

// Different rate limiters for different routes
const rateLimiters = {
  // API rate limiter
  api: createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requests per 15 minutes
  }),

  // Auth rate limiter (more strict)
  auth: createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 attempts per hour
    message: {
      error: 'Too many login attempts, please try again later.'
    }
  }),

  // Search rate limiter
  search: createRateLimiter({
    windowMs: 60 * 1000, // 1 minute
    max: 30 // 30 searches per minute
  })
};

module.exports = rateLimiters; 