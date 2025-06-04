import express from 'express';
import {
  getAllManagers,
  updateManager,
  deleteManager,
  fetchManager,
} from '../controllers/manager.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

router.use(protect);
router.get('/', getAllManagers);

router.route('/:id').patch(restrictTo('admin'), updateManager).get(fetchManager);

router.delete('/:id', restrictTo('admin'), deleteManager);

export default router;
