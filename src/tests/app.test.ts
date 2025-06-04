import request from 'supertest';
import app from '../app'; // Adjust path if needed

describe('Health check', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  });
});