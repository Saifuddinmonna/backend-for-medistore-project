import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma.js';
import { generateToken } from '../utils/jwt.js'; // হেল্পার ইমপোর্ট করা হয়েছে
// ১. ইউজার রেজিস্ট্রেশন
export const register = async (req, res) => {
    // default to a normal user if the client doesn't supply one
    let { name, email, password, role = 'Customer' } = req.body;
    role = role[0].toUpperCase() + role.slice(1).toLowerCase(); // Ensure role is uppercase (e.g., 'Admin' -> 'ADMIN')
    try {
        // optional: check for duplicate beforehand so we can give a nicer message
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res
                .status(409)
                .json({ success: false, message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        });
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: { id: user.id, name, role },
        });
    }
    catch (err) {
        // log the real error so you can see what’s going wrong
        console.error('register error:', err);
        res
            .status(500)
            .json({ success: false, message: 'Registration failed', error: err.message });
    }
};
// ২. ইউজার লগইন
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email); // Debug log
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        // পাসওয়ার্ড চেক
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        // লগইন ফাংশনের ভেতরে (পাসওয়ার্ড চেক করার ঠিক পরে):
        if (user.status === 'BANNED') {
            return res.status(403).json({
                success: false,
                message: "Your account has been banned. Please contact the administrator."
            });
        }
        // হেল্পার ফাংশন ব্যবহার করে টোকেন তৈরি
        const token = generateToken({ id: user.id, role: user.role });
        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, role: user.role }
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Login failed" });
    }
};
export const getMe = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, role: true, status: true }
        });
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map