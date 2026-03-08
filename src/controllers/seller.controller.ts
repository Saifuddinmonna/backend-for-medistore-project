import prisma from '../utils/prisma.js';

// ১. সেলার নতুন ওষুধ যোগ করবে
export const sellerAddMedicine = async (req: any, res: any, next: any) => {
  try {
    // pick only the fields we want to allow and validate required ones
    const {
      name,
      manufacturer,
      price,
      stock,
      categoryId,
      description,
      image
    } = req.body;

    // simple presence checks for required fields (image is optional now)
    if (
      !name ||
      !manufacturer ||
      price === undefined ||
      stock === undefined ||
      !categoryId ||
      !description
    ) {
      return res.status(400).json({
        error: "Missing required medicine data. Please provide all fields except image (ইমেজ ছাড়া সমস্ত তথ্য দিন)।"
      });
    }

    // accept only non-empty strings for image; ignore anything else
    const imageProvided = typeof image === 'string' && image.trim() !== '';

    const medicine = await prisma.medicine.create({
      data: {
        name,
        manufacturer,
        price: Number(price),
        stock: Number(stock),
        categoryId,
        description,
        // if imageProvided is false we pass undefined so Prisma omits it
        image: imageProvided ? image : undefined,
        sellerId: req.user.id
      }
    });

    const baseMessage = "Medicine added to inventory";
    const note = imageProvided
      ? ''
      : ' (ইমেজ আপলোড করা হয়নি / image not uploaded)';

    res.status(201).json({ message: baseMessage + note, medicine });
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
// সেলারের নিজের ওষুধের লিস্ট দেখা (/api/seller/medicines)
export const getSellerMedicines = async (req: any, res: any, next: any) => {
  try {
    const medicines = await prisma.medicine.findMany({
      where: { sellerId: req.user.id },
      include: { category: true }
    });
    res.json(medicines);
  } catch (error) {
    next(error);
  }
};