import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../models/customer.model';
import Car from '../models/car.model';
import config from '../config/env'; // adjust path as needed
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

const signToken = (customer: any) =>
  jwt.sign({ id: customer._id, email: customer.email }, `${config.JWT_SECRET}`, {
    expiresIn: '7d',
  });

export const purchaseCar = catchAsync(async (req: Request, res: Response) => {
  const customer = req.customer; // set by protectCustomer
  const { carId } = req.body;

  // Check if car exists and is available
  const car = await Car.findById(carId);
  if (!car) {
    throw new AppError('Car not found', 404);
  }
  if (!car.available) {
    throw new AppError('Car is not available', 400);
  }

  // Add car to customer's purchases
  customer.purchases.push(car._id as import('mongoose').Types.ObjectId);
  await customer.save();

  // Mark car as unavailable
  car.available = false;
  await car.save();

  res.status(200).json({
    status: 'success',
    message: 'Car purchased successfully',
    data: {
      customer,
      car,
    },
  });
});

export const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const customer = await Customer.create({ name, email, password });
  const token = signToken(customer);
  res.status(201).json({ status: 'success', data: { customer, token } });
});

export const loginCustomer = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });
  if (!customer || !(await customer.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }
  const token = signToken(customer);
  res.status(200).json({ status: 'success', data: { customer, token } });
});

export const fetchAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const customers = await Customer.find().select('-password');
  res.status(200).json({
    status: 'success',
    results: customers.length,
    data: { customers },
  });
});
