import { Request, Response, NextFunction } from 'express';
import Category from '../models/category.model';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.create(req.body);
  res.status(201).json({ status: 'success', data: { category } });
});

export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.status(200).json({ status: 'success', data: { categories } });
});

export const getCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  res.status(200).json({ status: 'success', data: { category } });
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    throw new AppError('Category not found', 404);
  }
  res.status(200).json({ status: 'success', data: { category } });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ status: 'error', message: 'Category not found' });
  }
  res.status(200).json({ status: 'success', message: 'Category deleted' });
});
