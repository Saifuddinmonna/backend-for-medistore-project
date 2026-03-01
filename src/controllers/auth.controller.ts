import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma.js';
import { generateToken } from '../utils/jwt.js'; // হেল্পার ইমপোর্ট করা হয়েছে

// ১. ইউজার রেজিস্ট্রেশন
export const register = async (req: any, res: any) => {
  const { name, email, password, role } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });

    res.status(201).json({ 
      success: true,
      message: "Registration successful", 
      user: { id: user.id, name, role } 
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "User already exists or invalid data" });
  }
};

// ২. ইউজার লগইন
export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // পাসওয়ার্ড চেক
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // হেল্পার ফাংশন ব্যবহার করে টোকেন তৈরি
    const token = generateToken({ id: user.id, role: user.role });

    res.json({ 
      success: true,
      token, 
      user: { id: user.id, name: user.name, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};