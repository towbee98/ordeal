import Manager from '../models/manager.model';
import { Request, Response, NextFunction } from 'express';

export const getAllManagers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const managers = await Manager.find().select('-password'); // Exclude password
    res.status(200).json({
      status: 'success',
      results: managers.length,
      data: managers,
    });
  } catch (err) {
    next(err);
  }
};

export const updateManager = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
      return res.status(404).json({ status: 'error', message: 'Manager not found' });
    }

    res.status(200).json({
      status: 'success',
      data: updatedManager,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteManager = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await Manager.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Manager not found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Manager deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};