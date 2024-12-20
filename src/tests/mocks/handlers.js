import { rest } from 'msw';

export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    // Mock implementation...
  }),
  // More handlers...
]; 