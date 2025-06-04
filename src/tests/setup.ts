import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/car_dealership_test'); // Use a test DB
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});