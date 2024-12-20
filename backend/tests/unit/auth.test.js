const { AuthService } = require('../../src/services/auth.service');
const { User } = require('../../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('login', () => {
    it('should return token and user for valid credentials', async () => {
      const mockUser = {
        _id: '123',
        email: 'test@test.com',
        password: 'hashedPassword',
        role: 'user'
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token');

      const result = await authService.login('test@test.com', 'password');

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user._id).toBe('123');
    });

    it('should throw error for invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(
        authService.login('wrong@email.com', 'password')
      ).rejects.toThrow('Invalid credentials');
    });
  });
}); 