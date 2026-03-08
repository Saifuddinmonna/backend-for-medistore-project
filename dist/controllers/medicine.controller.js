import prisma from '../utils/prisma.js';
/**
 * ১. সব ওষুধ দেখা (Public Feature)
 * রিকোয়ারমেন্ট: Search and filter by category, price, manufacturer
 */
export const getAllMedicines = async (req, res) => {
    const { search, category, minPrice, maxPrice, manufacturer } = req.query;
    try {
        const medicines = await prisma.medicine.findMany({
            where: {
                // সার্চ লজিক (নামে সার্চ)
                name: { contains: search, mode: 'insensitive' },
                // ক্যাটাগরি ফিল্টার
                category: category ? { name: category } : undefined,
                // ম্যানুফ্যাকচারার ফিল্টার
                manufacturer: manufacturer ? { contains: manufacturer, mode: 'insensitive' } : undefined,
                // প্রাইস রেঞ্জ ফিল্টার
                price: {
                    gte: minPrice ? parseFloat(minPrice) : 0,
                    lte: maxPrice ? parseFloat(maxPrice) : 999999,
                },
            },
            include: { category: true, seller: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(medicines);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch medicines", error: err });
    }
};
/**
 * ২. একটি ওষুধের ডিটেইলস দেখা (Public Feature)
 */
export const getMedicineById = async (req, res) => {
    const { id } = req.params;
    try {
        const medicine = await prisma.medicine.findUnique({
            where: { id },
            include: { category: true, seller: { select: { name: true } } }
        });
        if (!medicine)
            return res.status(404).json({ message: "Medicine not found" });
        res.json(medicine);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching details" });
    }
};
/**
 * ৩. নতুন ওষুধ যোগ করা (Seller Feature)
 * রিকোয়ারমেন্ট: Add medicines to inventory
 */
export const addMedicine = async (req, res) => {
    const { name, description, price, stock, manufacturer, image, categoryId } = req.body;
    try {
        const medicine = await prisma.medicine.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                manufacturer,
                image,
                categoryId,
                sellerId: req.user.id // যে সেলার লগইন করা তার আইডি
            }
        });
        res.status(201).json({ message: "Medicine added successfully", medicine });
    }
    catch (err) {
        res.status(400).json({ message: "Failed to add medicine", error: err });
    }
};
/**
 * ৪. ওষুধ আপডেট করা (Seller Feature)
 * রিকোয়ারমেন্ট: Edit medicines and Manage stock levels
 */
export const updateMedicine = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, manufacturer, image } = req.body;
    try {
        // চেক করা হচ্ছে এই ওষুধটি এই সেলারেরই কি না (Security)
        const existing = await prisma.medicine.findUnique({ where: { id } });
        if (!existing || existing.sellerId !== req.user.id) {
            return res.status(403).json({ message: "You can only edit your own medicines" });
        }
        const updated = await prisma.medicine.update({
            where: { id },
            data: { name, description, price, stock, manufacturer, image }
        });
        res.json({ message: "Medicine updated", updated });
    }
    catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
};
/**
 * ৫. ওষুধ রিমুভ করা (Seller Feature)
 */
export const deleteMedicine = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.medicine.delete({ where: { id } });
        res.json({ message: "Medicine deleted successfully" });
    }
    catch (err) {
        res.status(400).json({ message: "Delete failed" });
    }
};
/**
 * ১. ওষুধের ওপর রিভিউ এবং রেটিং দেওয়া (Customer Feature)
 * রিকোয়ারমেন্ট: Leave reviews after ordering
 */
export const createReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const { medicineId } = req.params;
        // রেটিং এবং কমেন্ট আছে কি না চেক করা
        if (!rating || !comment) {
            return res.status(400).json({ success: false, message: "Rating and comment are required" });
        }
        // ডাটাবেসে রিভিউ তৈরি করা
        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating), // রেটিং নাম্বার হিসেবে সেভ হবে
                comment,
                medicineId,
                userId: req.user.id // যে কাস্টমার লগইন করা তার আইডি
            }
        });
        res.status(201).json({
            success: true,
            message: "Thank you for your review!",
            review
        });
    }
    catch (error) {
        // কোনো এরর হলে গ্লোবাল এরর হ্যান্ডলারে পাঠিয়ে দিবে
        next(error);
    }
};
/**
 * ২. একটি নির্দিষ্ট ওষুধের সব রিভিউ দেখা (Public Feature)
 * কাস্টমাররা মেডিসিন ডিটেইলস পেজে এটি দেখতে পাবে।
 */
export const getMedicineReviews = async (req, res, next) => {
    try {
        const { medicineId } = req.params;
        const reviews = await prisma.review.findMany({
            where: { medicineId },
            include: {
                user: {
                    select: { name: true } // শুধুমাত্র কাস্টমারের নাম দেখাবে (সিকিউরিটির জন্য)
                }
            },
            orderBy: { createdAt: 'desc' } // নতুন রিভিউ আগে দেখাবে
        });
        res.json(reviews);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=medicine.controller.js.map