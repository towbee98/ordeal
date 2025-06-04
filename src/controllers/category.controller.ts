import { Request, Response, NextFunction } from 'express';
import Category from '../models/category.model';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ status: 'success', data: { category } });
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ status: 'success', data: { categories } });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ status: 'error', message: 'Category not found' });
    }
    res.status(200).json({ status: 'success', data: { category } });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ status: 'error', message: 'Category not found' });
    }
    res.status(200).json({ status: 'success', data: { category } });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ status: 'error', message: 'Category not found' });
    }
    res.status(200).json({ status: 'success', message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};
