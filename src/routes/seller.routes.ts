import { Router } from 'express';
import { sellerAddMedicine, getSellerOrders, updateOrderStatus } from '../controllers/seller.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/medicines', verifyToken, authorize('Seller'), sellerAddMedicine);
router.get('/orders', verifyToken, authorize('Seller'), getSellerOrders);
router.patch('/orders/:id/status', verifyToken, authorize('Seller'), updateOrderStatus);

export default router;