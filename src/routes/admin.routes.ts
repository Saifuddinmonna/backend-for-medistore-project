import { Router } from 'express';
import { getAllUsers, updateUserStatus } from '../controllers/admin.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/users', verifyToken, authorize('Admin'), getAllUsers);
router.patch('/users/:id', verifyToken, authorize('Admin'), updateUserStatus);

export default router;