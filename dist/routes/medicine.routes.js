import { Router } from 'express';
import { getAllMedicines, getMedicineById, addMedicine, updateMedicine, deleteMedicine, getMedicineReviews, createReview } from '../controllers/medicine.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';
const router = Router();
// পাবলিক রাউটস (সবাই এক্সেস করতে পারবে)
router.get('/', getAllMedicines);
router.get('/:id', getMedicineById);
router.get('/:medicineId/reviews', getMedicineReviews); // ওষুধের সব রিভিউ দেখা
// প্রাইভেট রাউটস (শুধুমাত্র সেলার বা এডমিন)
router.post('/', verifyToken, authorize('Seller', 'Admin'), addMedicine);
router.put('/:id', verifyToken, authorize('Seller', 'Admin'), updateMedicine);
router.delete('/:id', verifyToken, authorize('Seller', 'Admin'), deleteMedicine);
router.post('/:medicineId/reviews', verifyToken, authorize('Customer'), createReview); // রিভিউ দেওয়া
router.get('/:medicineId/reviews', getMedicineReviews); // রিভিউ দেখা (Public)
export default router;
//# sourceMappingURL=medicine.routes.js.map