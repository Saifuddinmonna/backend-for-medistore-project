import { Router } from 'express';
import { sellerAddMedicine, getSellerOrders, updateOrderStatus, getSellerMedicines } from '../controllers/seller.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';
const router = Router();
router.post('/medicines', verifyToken, authorize('Seller'), sellerAddMedicine);
router.get('/orders', verifyToken, authorize('Seller'), getSellerOrders);
router.patch('/orders/:id/status', verifyToken, authorize('Seller'), updateOrderStatus);
router.get('/medicines', verifyToken, authorize('SELLER'), getSellerMedicines); // সেলারের নিজের ইনভেন্টরি
export default router;
//# sourceMappingURL=seller.routes.js.map