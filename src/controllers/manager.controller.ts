import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import Manager from '../models/manager.model';
import { AppError } from '../utils/appError';

export const getAllManagers = catchAsync(async (req: Request, res: Response) => {
  const managers = await Manager.find().select('-password'); // Exclude password
  res.status(200).json({
    status: 'success',
    results: managers.length,
    data: managers,
  });
});

export const updateManager = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Exclude password from updates
  const updateData = { ...req.body };
  delete updateData.password;

  const updatedManager = await Manager.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
    select: '-password',
  });

  if (!updatedManager) {
    throw new AppError('Manager not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: updatedManager,
  });
});

export const deleteManager = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Manager.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError('Manager not found', 404);
  }

  res.status(200).json({
    status: 'success',
    message: 'Manager deleted successfully',
  });
});

export const fetchManager = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const manager = await Manager.findById(id).select('-password'); // Exclude password

  if (!manager) {
    throw new AppError('Manager not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: manager,
  });
});
