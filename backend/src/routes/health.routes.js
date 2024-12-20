const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const redis = require('../config/redis');

router.get('/health', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  try {
    // Check MongoDB
    await mongoose.connection.db.admin().ping();
    healthcheck.database = 'OK';

    // Check Redis
    await redis.ping();
    healthcheck.cache = 'OK';

    res.json(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).json(healthcheck);
  }
});

module.exports = router; 