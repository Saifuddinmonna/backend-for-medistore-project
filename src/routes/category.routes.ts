import { Router } from 'express';
import { 
  getAllCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/category.controller.js';
import { verifyToken, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// সবাই ক্যাটাগরি লিস্ট দেখতে পারবে
router.get('/', getAllCategories);

// শুধুমাত্র এডমিন ক্যাটাগরি যোগ, এডিট বা ডিলিট করতে পারবে
router.post('/', verifyToken, authorize('Admin'), createCategory);
router.put('/:id', verifyToken, authorize('Admin'), updateCategory);
router.delete('/:id', verifyToken, authorize('Admin'), deleteCategory);

export default router;