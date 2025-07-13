const request = require('supertest');
const app = require('../server'); // Make sure your server exports the Express app

describe('GET /api/products', () => {
  it('should return an array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
