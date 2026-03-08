import prisma from '../utils/prisma.js';
// ১. সব ইউজারের লিস্ট দেখা (Customers & Sellers)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, status: true }
        });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
// ২. ইউজার ব্যান বা আনব্যান করা (/api/admin/users/:id)
export const updateUserStatus = async (req, res, next) => {
    try {
        const { status } = req.body; // ACTIVE or BANNED
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: { status }
        });
        res.json({ message: "User status updated successfully", user });
    }
    catch (error) {
        next(error);
    }
};
// নতুন ক্যাটাগরি তৈরি (Admin Only)
export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({ data: { name } });
        res.status(201).json({ message: "Category created", category });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=admin.controller.js.map