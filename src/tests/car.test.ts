import request from 'supertest';
import app from '../app';
import '../tests/setup';

jest.setTimeout(20000);

describe('Car Endpoints', () => {
  let token: string;
  let carId: string;

  const manager = {
    name: 'Car Manager',
    email: 'carmanager@example.com',
    password: 'testpass123',
  };

  const carPayload = {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 18500,
    mileage: 12000,
    color: 'Blue',
    fuelType: 'petrol',
    transmission: 'automatic',
    available: true,
    features: ['Bluetooth', 'Backup Camera'],
    images: [],
    description: 'A reliable and fuel-efficient sedan with modern features.',
  };

  beforeAll(async () => {
    // Register and login manager to get token
    await request(app).post('/auth/register').send(manager);
    const res = await request(app).post('/auth/login').send({
      email: manager.email,
      password: manager.password,
    });
    token = res.body.data.token;
  });

  it('should create a new car', async () => {
    const res = await request(app)
      .post('/cars')
      .set('Authorization', `Bearer ${token}`)
      .send(carPayload);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('car');
    expect(res.body.data.car.brand).toBe(carPayload.brand);
    carId = res.body.data.car._id;
  });

  it('should get all cars', async () => {
    const res = await request(app).get('/cars');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.cars)).toBe(true);
  });

  it('should get a single car', async () => {
    const res = await request(app).get(`/cars/${carId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.car._id).toBe(carId);
  });

  it('should update a car', async () => {
    const res = await request(app)
      .patch(`/cars/${carId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 19000 });

    expect(res.status).toBe(200);
    expect(res.body.data.car.price).toBe(19000);
  });

  it('should delete a car', async () => {
    const res = await request(app).delete(`/cars/${carId}`).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
    expect(res.body.data.message).toMatch(/deleted/i);
  });
});
