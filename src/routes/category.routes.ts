import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { validateCategory } from '../middleware/validators';

const router = express.Router();
router.post('/', protect, restrictTo('admin', 'manager'), validateCategory, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.patch('/:id', protect, restrictTo('admin', 'manager'), updateCategory);
router.delete('/:id', protect, restrictTo('admin', 'manager'), deleteCategory);

export default router;
