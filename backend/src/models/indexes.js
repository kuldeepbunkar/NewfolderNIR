const mongoose = require('mongoose');
const logger = require('../config/logger');

async function createIndexes() {
  try {
    // Property indexes
    await mongoose.model('Property').collection.createIndexes([
      { title: 'text', description: 'text' },
      { 'location.city': 1 },
      { price: 1 },
      { type: 1 },
      { status: 1 },
      { createdAt: -1 }
    ]);

    // User indexes
    await mongoose.model('User').collection.createIndexes([
      { email: 1 },
      { role: 1 },
      { createdAt: -1 }
    ]);

    // Activity indexes
    await mongoose.model('Activity').collection.createIndexes([
      { user: 1, type: 1 },
      { property: 1 },
      { createdAt: -1 }
    ]);

    // Review indexes
    await mongoose.model('Review').collection.createIndexes([
      { property: 1 },
      { user: 1 },
      { rating: -1 }
    ]);

    logger.info('Database indexes created successfully');
  } catch (error) {
    logger.error('Error creating database indexes:', error);
    throw error;
  }
}

module.exports = createIndexes; 