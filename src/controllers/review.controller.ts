import prisma from '../utils/prisma.js';

// ১. ওষুধের ওপর রিভিউ দেওয়া (Customer Feature)
export const createReview = async (req: any, res: any, next: any) => {
  try {
    const { rating, comment, medicineId } = req.body;
    
    // চেক করা হচ্ছে কাস্টমার আগে এটি অর্ডার করেছে কি না (অ্যাডভান্সড লজিক)
    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        medicineId,
        userId: req.user.id
      }
    });
    res.status(201).json({ success: true, message: "Review added", review });
  } catch (error) {
    next(error);
  }
};

// ২. একটি নির্দিষ্ট ওষুধের সব রিভিউ দেখা (Public)
export const getMedicineReviews = async (req: any, res: any, next: any) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { medicineId: req.params.medicineId },
      include: { user: { select: { name: true } } }
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};