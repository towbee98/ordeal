import Customer from '../models/customer.model';
import { Request, Response, NextFunction } from 'express';
import Car from '../models/car.model';
import jwt from 'jsonwebtoken';
import config from '../config/env'; // adjust path as needed

const signToken = (customer: any) =>
  jwt.sign({ id: customer._id, email: customer.email }, `${config.JWT_SECRET}`, {
    expiresIn: '7d',
  });

export const purchaseCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = req.customer; // set by protectCustomer
    const { carId } = req.body;

    // Check if car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ status: 'error', message: 'Car not found' });
    }
    if (!car.available) {
      return res.status(400).json({ status: 'error', message: 'Car is not available' });
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
  } catch (err) {
    next(err);
  }
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const customer = await Customer.create({ name, email, password });
    const token = signToken(customer);
    res.status(201).json({ status: 'success', data: { customer, token } });
  } catch (err) {
    next(err);
  }
};

export const loginCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer || !(await customer.comparePassword(password))) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
    const token = signToken(customer);
    res.status(200).json({ status: 'success', data: { customer, token } });
  } catch (err) {
    next(err);
  }
};

export const fetchAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await Customer.find().select('-password'); // Exclude password
    res.status(200).json({
      status: 'success',
      results: customers.length,
      data: { customers },
    });
  } catch (err) {
    next(err);
  }
};
