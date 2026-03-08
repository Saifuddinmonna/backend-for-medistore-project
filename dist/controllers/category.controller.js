import prisma from '../utils/prisma.js';
/**
 * ১. সব ক্যাটাগরি দেখা (Public Feature)
 * কাস্টমার এবং সেলার সবাই এটি দেখতে পারবে।
 */
export const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};
/**
 * ২. নতুন ক্যাটাগরি তৈরি করা (Admin Feature)
 */
export const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Category name is required" });
    }
    try {
        const category = await prisma.category.create({
            data: { name }
        });
        res.status(201).json({ message: "Category created successfully", category });
    }
    catch (err) {
        res.status(400).json({ message: "Category already exists" });
    }
};
/**
 * ৩. ক্যাটাগরি আপডেট করা (Admin Feature)
 */
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updated = await prisma.category.update({
            where: { id },
            data: { name }
        });
        res.json({ message: "Category updated", updated });
    }
    catch (err) {
        res.status(400).json({ message: "Update failed or category not found" });
    }
};
/**
 * ৪. ক্যাটাগরি ডিলিট করা (Admin Feature)
 */
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        // নোট: ক্যাটাগরি ডিলিট করার আগে চেক করা উচিত ওই ক্যাটাগরিতে কোনো ওষুধ আছে কি না।
        await prisma.category.delete({ where: { id } });
        res.json({ message: "Category deleted successfully" });
    }
    catch (err) {
        res.status(400).json({ message: "Cannot delete category (it might be in use)" });
    }
};
//# sourceMappingURL=category.controller.js.map