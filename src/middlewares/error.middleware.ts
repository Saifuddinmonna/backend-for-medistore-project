import { Request, Response, NextFunction } from 'express';
import { Prisma } from '../generated/client/client.js';

/**
 * গ্লোবাল এরর হ্যান্ডলার মিডলওয়্যার
 * এটি পুরো অ্যাপ্লিকেশনের যেকোনো এররকে সুন্দরভাবে ফরম্যাট করে ফ্রন্টএন্ডে পাঠাবে।
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  // ১. প্রিজমা ইউনিক কনস্ট্রেইন্ট এরর (যেমন: একই ইমেইল দিয়ে দুইবার রেজিস্ট্রেশন)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 400;
      const target = (err.meta?.target as string[]) || ['field'];
      message = `${target.join(', ')} already exists. Please use another one.`;
    }
    
    // ২. প্রিজমা ডাটা না পাওয়ার এরর (যেমন: ভুল আইডিতে আপডেট বা ডিলিট করা)
    if (err.code === 'P2025') {
      statusCode = 404;
      message = "Record not found in the database.";
    }
  }

  // ৩. JWT বা টোকেন সংক্রান্ত এরর
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = "Invalid token. Please login again.";
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = "Your session has expired. Please login again.";
  }

  // ৪. রেসপন্স পাঠানো
  res.status(statusCode).json({
    success: false,
    message,
    // শুধুমাত্র ডেভেলপমেন্ট মোডে থাকাকালীন stack trace দেখাবে (ডিবাগিং এর জন্য সুবিধা)
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};