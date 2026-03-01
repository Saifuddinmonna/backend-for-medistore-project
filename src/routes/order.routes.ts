import { Router } from 'express';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', verifyToken, authorize('CUSTOMER'), createOrder);
router.get('/my-orders', verifyToken, authorize('CUSTOMER'), getMyOrders);
router.get('/all', verifyToken, authorize('SELLER', 'ADMIN'), getAllOrders);
router.patch('/:id/status', verifyToken, authorize('SELLER', 'ADMIN'), updateOrderStatus);

export default router;