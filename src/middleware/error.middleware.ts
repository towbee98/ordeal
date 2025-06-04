import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error('Error caught by middleware:', err.message);
  logger.error('Stack trace:', err.stack);
  const statusCode = (err as CustomError).statusCode || 500;
  res.status(statusCode).json({
    status: (err as CustomError).status || 'error',
    message: err.message || 'An unexpected error occurred',
    // error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
