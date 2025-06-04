import { Request, Response } from 'express';
import Car from '../models/car.model';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import Category from '../models/category.model';

export const createCar = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    throw new AppError('Category not found', 400);
  }
  const car = await Car.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      car,
    },
  });
});

export const getAllCars = catchAsync(async (req: Request, res: Response) => {
  // Build query
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Car.find(JSON.parse(queryStr)).populate('category');

  // Sorting
  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = (req.query.fields as string).split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Execute query
  const cars = await query;
  const total = await Car.countDocuments(JSON.parse(queryStr));

  res.status(200).json({
    status: 'success',
    data: {
      results: cars.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      cars,
    },
  });
});

export const getCar = catchAsync(async (req: Request, res: Response) => {
  const car = await Car.findById(req.params.id).populate('category');

  if (!car) {
    throw new AppError('Car not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      car,
    },
  });
});

export const updateCar = catchAsync(async (req: Request, res: Response) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!car) {
    throw new AppError('Car not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      car,
    },
  });
});

export const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  if (!car) {
    throw new AppError('Car not found', 404);
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
