import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../config/jwt';
import Manager from '../models/manager.model';
import jwt from 'jsonwebtoken';
import Customer from '../models/customer.model';
import config from '../config/env';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
      customer?: any; // Add customer property
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verifyToken(token);

    // Check if manager still exists
    const manager = await Manager.findById(decoded.id);
    if (!manager) {
      res.status(401).json({
        status: 'error',
        message: 'Manager no longer exists',
      });
      return;
    }

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Not authorized to access this route',
    });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action',
      });
      return;
    }

    next();
  };
};

export const protectCustomer = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Not logged in' });
  }
  try {
    const decoded: any = jwt.verify(token, `${config.JWT_SECRET}`);
    const customer = await Customer.findById(decoded.id);
    if (!customer) {
      return res.status(401).json({ status: 'error', message: 'Customer not found' });
    }
    req.customer = customer;
    next();
  } catch (err) {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
};
