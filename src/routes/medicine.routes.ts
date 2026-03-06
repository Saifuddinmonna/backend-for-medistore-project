import { Router } from 'express';
import { 
  getAllMedicines, 
  getMedicineById, 
  addMedicine, 
  updateMedicine, 
  deleteMedicine 
} from '../controllers/medicine.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// পাবলিক রাউটস (সবাই এক্সেস করতে পারবে)
router.get('/', getAllMedicines);
router.get('/:id', getMedicineById);

// প্রাইভেট রাউটস (শুধুমাত্র সেলার বা এডমিন)
router.post('/', verifyToken, authorize('Seller', 'Admin'), addMedicine);
router.put('/:id', verifyToken, authorize('Seller', 'Admin'), updateMedicine);
router.delete('/:id', verifyToken, authorize('Seller', 'Admin'), deleteMedicine);

export default router;