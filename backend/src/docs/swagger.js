const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next Innovation Realty API',
      version: '1.0.0',
      description: 'Complete API documentation for Next Innovation Realty platform',
      contact: {
        name: 'API Support',
        email: 'support@nextinnovation.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Property: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Modern Apartment' },
            description: { type: 'string' },
            price: { type: 'number', example: 1500000 },
            type: { 
              type: 'string', 
              enum: ['apartment', 'house', 'villa', 'plot'] 
            },
            location: {
              type: 'object',
              properties: {
                address: { type: 'string' },
                city: { type: 'string' },
                coordinates: {
                  type: 'object',
                  properties: {
                    lat: { type: 'number' },
                    lng: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options); 