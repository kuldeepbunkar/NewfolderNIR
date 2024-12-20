const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const { Property } = require('../../src/models/Property');

describe('Property API', () => {
  let token;
  let testProperty;

  beforeAll(async () => {
    const user = await global.testHelpers.createTestUser('agent');
    token = global.testHelpers.generateTestToken(user._id, 'agent');
  });

  beforeEach(async () => {
    testProperty = {
      title: 'Test Property',
      description: 'Test Description',
      price: 1000000,
      type: 'apartment',
      location: {
        address: 'Test Address',
        city: 'Test City'
      }
    };
  });

  describe('POST /api/properties', () => {
    it('should create a new property', async () => {
      const response = await request(app)
        .post('/api/properties')
        .set('Authorization', `Bearer ${token}`)
        .send(testProperty);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(testProperty.title);
    });

    it('should return 400 for invalid data', async () => {
      delete testProperty.title;

      const response = await request(app)
        .post('/api/properties')
        .set('Authorization', `Bearer ${token}`)
        .send(testProperty);

      expect(response.status).toBe(400);
    });
  });
}); 