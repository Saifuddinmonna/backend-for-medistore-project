import prisma from '../utils/prisma.js';

// ১. নতুন অর্ডার তৈরি করা (Customer)
export const createOrder = async (req: any, res: any) => {
  const { items, totalAmount, shippingAddress } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {

      const order = await tx.order.create({
        data: {
          customerId: req.user.id,
          items,
          totalAmount: parseFloat(totalAmount),
          shippingAddress,
          status: 'PLACED'
        }
      });

      await Promise.all(
        items.map((item: any) =>
          tx.medicine.update({
            where: { id: item.medicineId },
            data: {
              stock: { decrement: item.quantity }
            }
          })
        )
      );

      return order;
    });

    res.status(201).json(result);

  } catch (err) {
    res.status(400).json({
      message: "Order failed",
      error: err
    });
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
// অর্ডারের আইডি দিয়ে ডিটেইলস দেখা (/api/orders/:id)
export const getOrderById = async (req: any, res: any, next: any) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { customer: { select: { name: true, email: true } } }
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};
// অর্ডার প্লেস করার সময় স্টক আপডেট করার লজিক (createOrder এর ভেতরে এটি অ্যাড করুন)
/*
items.forEach(async (item: any) => {
  await prisma.medicine.update({
    where: { id: item.medicineId },
    data: { stock: { decrement: item.quantity } }
  });
});
*/