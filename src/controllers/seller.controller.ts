import prisma from '../utils/prisma.js';

// ১. সেলার নতুন ওষুধ যোগ করবে
export const sellerAddMedicine = async (req: any, res: any, next: any) => {
  try {
    const medicine = await prisma.medicine.create({
      data: { ...req.body, sellerId: req.user.id }
    });
    res.status(201).json({ message: "Medicine added to inventory", medicine });
  } catch (error) {
    next(error);
  }
};

// ২. সেলার তার দোকানে আসা অর্ডারগুলো দেখবে
export const getSellerOrders = async (req: any, res: any, next: any) => {
  try {
    // এখানে সব অর্ডার দেখাচ্ছে, আপনি চাইলে ফিল্টার করতে পারেন
    const orders = await prisma.order.findMany(); 
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// ৩. অর্ডারের স্ট্যাটাস আপডেট (Processing, Shipped, Delivered)
export const updateOrderStatus = async (req: any, res: any, next: any) => {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json({ message: "Status updated", order });
  } catch (error) {
    next(error);
  }
};