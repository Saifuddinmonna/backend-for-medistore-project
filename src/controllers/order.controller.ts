import prisma from '../utils/prisma.js';

// ১. নতুন অর্ডার তৈরি করা (Customer)
export const createOrder = async (req: any, res: any) => {
  const { items, totalAmount, shippingAddress } = req.body;
  
  try {
    const order = await prisma.order.create({
      data: {
        customerId: req.user.id,
        items, // JSON array of medicines
        totalAmount: parseFloat(totalAmount),
        shippingAddress,
        status: 'PLACED'
      }
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: "Order failed", error: err });
  }
};

// ২. নিজের অর্ডারগুলো দেখা (Customer)
export const getMyOrders = async (req: any, res: any) => {
  const orders = await prisma.order.findMany({
    where: { customerId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
};

// ৩. সব অর্ডার দেখা (Admin/Seller)
export const getAllOrders = async (req: any, res: any) => {
  const orders = await prisma.order.findMany({
    include: { customer: { select: { name: true, email: true } } }
  });
  res.json(orders);
};

// ৪. অর্ডারের স্ট্যাটাস আপডেট করা (Seller/Admin)
export const updateOrderStatus = async (req: any, res: any) => {
  const { status } = req.body;
  const { id } = req.params;

  const order = await prisma.order.update({
    where: { id },
    data: { status }
  });
  res.json({ message: `Order status updated to ${status}`, order });
};