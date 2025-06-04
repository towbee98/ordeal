import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      status: 'error',
      message: 'Please provide name, email and password',
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      status: 'error',
      message: 'Password must be at least 6 characters long',
    });
    return;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      status: 'error',
      message: 'Please provide a valid email address',
    });
    return;
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: 'error',
      message: 'Please provide email and password',
    });
    return;
  }

  next();
};

export const validateCar = (req: Request, res: Response, next: NextFunction) => {
  const {
    brand,
    model,
    year,
    price,
    mileage,
    color,
    fuelType,
    transmission,
    description,
    category,
  } = req.body;

  const requiredFields = [
    'brand',
    'model',
    'year',
    'price',
    'mileage',
    'color',
    'fuelType',
    'transmission',
    'description',
    'category',
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return next(new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400));
  }

  // Validate year
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear + 1) {
    return next(new AppError(`Year must be between 1900 and ${currentYear + 1}`, 400));
  }

  // Validate price and mileage
  if (price < 0) {
    return next(new AppError('Price cannot be negative', 400));
  }

  if (mileage < 0) {
    return next(new AppError('Mileage cannot be negative', 400));
  }

  // Validate fuel type
  const validFuelTypes = ['petrol', 'diesel', 'electric', 'hybrid'];
  if (!validFuelTypes.includes(fuelType)) {
    return next(
      new AppError(`Invalid fuel type. Must be one of: ${validFuelTypes.join(', ')}`, 400)
    );
  }

  // Validate transmission
  const validTransmissions = ['manual', 'automatic'];
  if (!validTransmissions.includes(transmission)) {
    return next(
      new AppError(
        `Invalid transmission type. Must be one of: ${validTransmissions.join(', ')}`,
        400
      )
    );
  }

  // Validate description length
  if (description.length < 10) {
    return next(new AppError('Description must be at least 10 characters long', 400));
  }

  next();
};

export const validateCarUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { year, price, mileage, fuelType, transmission, description } = req.body;

  const currentYear = new Date().getFullYear();

  if (year !== undefined && (year < 1900 || year > currentYear + 1)) {
    return next(new AppError(`Year must be between 1900 and ${currentYear + 1}`, 400));
  }

  if (price !== undefined && price < 0) {
    return next(new AppError('Price cannot be negative', 400));
  }

  if (mileage !== undefined && mileage < 0) {
    return next(new AppError('Mileage cannot be negative', 400));
  }

  const validFuelTypes = ['petrol', 'diesel', 'electric', 'hybrid'];
  if (fuelType !== undefined && !validFuelTypes.includes(fuelType)) {
    return next(
      new AppError(`Invalid fuel type. Must be one of: ${validFuelTypes.join(', ')}`, 400)
    );
  }

  const validTransmissions = ['manual', 'automatic'];
  if (transmission !== undefined && !validTransmissions.includes(transmission)) {
    return next(
      new AppError(
        `Invalid transmission type. Must be one of: ${validTransmissions.join(', ')}`,
        400
      )
    );
  }

  if (description !== undefined && description.length < 10) {
    return next(new AppError('Description must be at least 10 characters long', 400));
  }

  next();
};

export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Category name is required and must be a non-empty string',
    });
  }
  if (description && typeof description !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'Description must be a string',
    });
  }
  next();
};
