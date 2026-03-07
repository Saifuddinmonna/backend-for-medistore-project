import { Router } from 'express';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getOrderById } from '../controllers/order.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/:id', verifyToken, getOrderById); // অর্ডারের ডিটেইলস দেখা
router.post('/', verifyToken, authorize('Customer'), createOrder);
router.get('/my-orders', verifyToken, authorize('Customer'), getMyOrders);
router.get('/all', verifyToken, authorize('Seller', 'Admin'), getAllOrders);
router.patch('/:id/status', verifyToken, authorize('Seller', 'Admin'), updateOrderStatus);

export default router;