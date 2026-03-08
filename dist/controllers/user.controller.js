import prisma from '../utils/prisma.js';
// সব ইউজার দেখা (Admin Only)
export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, status: true }
    });
    res.json(users);
};
// ইউজার ব্যান বা আনব্যান করা (Admin Only)
export const toggleUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // ACTIVE or BANNED
    const user = await prisma.user.update({
        where: { id },
        data: { status }
    });
    res.json({ message: `User status changed to ${status}`, user });
};
//# sourceMappingURL=user.controller.js.map