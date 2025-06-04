import express from 'express';
import { createCar, deleteCar, getAllCars, getCar, updateCar } from '../controllers/car.controller';
import { validateCar, validateCarUpdate } from '../middleware/validators';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getAllCars);
router
  .route('/:id')
  .get(getCar)
  .patch(protect, restrictTo('admin', 'manager'), validateCarUpdate, updateCar)
  .delete(protect, restrictTo('admin', 'manager'), deleteCar);

// Protected routes
router.use(protect);
router.use(restrictTo('admin', 'manager'));

router.post('/', validateCar, createCar);

export default router;
