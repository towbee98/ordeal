import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middleware/validators';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = Router();

// Register route
router.post('/register', validateRegister, register);

// Login route
router.post('/login', validateLogin, login);

// Protected route example
router.get('/me', protect, (req, res) => {
  res.json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

// Admin only route example
router.get('/admin', protect, restrictTo('admin'), (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to admin area',
  });
});

export default router; 