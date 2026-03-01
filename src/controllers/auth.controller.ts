import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

export const register = async (req: any, res: any) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });
    res.status(201).json({ message: "Registration successful", user: { id: user.id, name, role } });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role }, 
    process.env.JWT_SECRET as string, 
    { expiresIn: '7d' }
  );

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};