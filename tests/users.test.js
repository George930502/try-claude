const request = require('supertest');
const app = require('../src/app');

describe('User Routes', () => {
  describe('GET /api/users', () => {
    it('should return empty array initially', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@example.com' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Test User');
    });

    it('should return 400 if name missing', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com' });
      expect(res.statusCode).toBe(400);
    });
  });
});
