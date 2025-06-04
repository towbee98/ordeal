import { Request, Response, NextFunction } from 'express';
import Manager from '../models/manager.model';
import { generateToken } from '../config/jwt';
import logger from '../utils/logger';
import { catchAsync } from '../utils/catchAsync';

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // Check if manager already exists
  const existingManager = await Manager.findOne({ email });
  if (existingManager) {
    res.status(400).json({
      status: 'error',
      message: 'Email already registered',
    });
    return;
  }

  // Create new manager
  const manager = await Manager.create({
    name,
    email,
    password,
    role: 'manager',
  });

  // Generate token
  const token = generateToken(manager);

  res.status(201).json({
    status: 'success',
    data: {
      manager: {
        id: manager._id,
        name: manager.name,
        email: manager.email,
        role: manager.role,
      },
      token,
    },
  });
  return;
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Check if manager exists
  const manager = await Manager.findOne({ email });
  if (!manager) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid credentials',
    });
    return;
  }

  // Check password
  const isPasswordValid = await manager.comparePassword(password);
  if (!isPasswordValid) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid credentials',
    });
    return;
  }

  // Generate token
  const token = generateToken(manager);

  res.status(200).json({
    status: 'success',
    data: {
      manager: {
        id: manager._id,
        name: manager.name,
        email: manager.email,
        role: manager.role,
      },
      token,
    },
  });
  return;
});
