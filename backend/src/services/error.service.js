const winston = require('winston');
require('winston-mongodb');

class ErrorService {
  constructor() {
    this.logger = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        // Log to file
        new winston.transports.File({ 
          filename: 'logs/error.log',
          level: 'error'
        }),
        // Log to MongoDB
        new winston.transports.MongoDB({
          db: process.env.MONGODB_URI,
          collection: 'logs',
          level: 'error'
        })
      ]
    });

    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
  }

  logError(error, req = null) {
    const errorLog = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date(),
      path: req?.originalUrl,
      method: req?.method,
      ip: req?.ip,
      user: req?.user?._id
    };

    this.logger.error(errorLog);
  }
}

module.exports = new ErrorService(); 