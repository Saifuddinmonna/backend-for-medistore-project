import { Router } from 'express';
import { getAllUsers, updateUserStatus, createCategory } from '../controllers/admin.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';
const router = Router();
router.get('/users', verifyToken, authorize('Admin'), getAllUsers);
router.patch('/users/:id', verifyToken, authorize('Admin'), updateUserStatus);
router.post('/categories', verifyToken, authorize('Admin'), createCategory); // এডমিনের ক্যাটাগরি তৈরি
export default router;
//# sourceMappingURL=admin.routes.js.map