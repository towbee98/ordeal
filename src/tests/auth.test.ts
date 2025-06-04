import request from 'supertest';
import app from '../app'; // Adjust path if needed
import '../tests/setup'; // Ensure DB setup/teardown runs

jest.setTimeout(20000); // 20 seconds

describe('Auth Flow', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testpass123',
  };

  it('should register a new manager and return a token', async () => {
    const res = await request(app).post('/auth/register').send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data).toHaveProperty('manager');
    expect(res.body.data.manager.email).toBe(testUser.email);
  });

  it('should login and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data).toHaveProperty('manager');
    expect(res.body.data.manager.email).toBe(testUser.email);
  });
});
