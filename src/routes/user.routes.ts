import { Router } from 'express';
import { getAllUsers, toggleUserStatus } from '../controllers/user.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, authorize('ADMIN'), getAllUsers);
router.patch('/:id/status', verifyToken, authorize('ADMIN'), toggleUserStatus);

export default router;