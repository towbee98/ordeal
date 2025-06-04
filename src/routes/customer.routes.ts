import express from 'express';
import {
  createCustomer,
  fetchAllCustomers,
  loginCustomer,
  purchaseCar,
} from '../controllers/customer.controller';
import { protect, protectCustomer, restrictTo } from '../middleware/auth.middleware'; //

const router = express.Router();

router.post('/register', createCustomer);

router.post('/login', loginCustomer);

router.post('/purchase', protectCustomer, purchaseCar);

router.get('/', protect, restrictTo('admin', 'manager'), fetchAllCustomers);

export default router;
