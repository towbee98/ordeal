import express from 'express';
import { getAllManagers, updateManager, deleteManager } from '../controllers/manager.controller';

const router = express.Router();

// Get all managers
router.get('/', getAllManagers);

// Update a manager by ID
router.patch('/:id', updateManager);

// Delete a manager by ID
router.delete('/:id', deleteManager);

export default router;
