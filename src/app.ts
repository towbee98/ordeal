import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware';
import logger from './utils/logger';
import authRoutes from './routes/auth.routes';
import carRoutes from './routes/car.routes';
import managerRoutes from './routes/manager.routes';
import customerRoutes from './routes/customer.routes';
import categoryRoutes from './routes/category.routes';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);
app.use('/managers', managerRoutes);
app.use('/customers', customerRoutes);
app.use('/categories', categoryRoutes);

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Car Dealership API' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Error handling middleware - must be last
app.use(errorHandler);

export default app;
