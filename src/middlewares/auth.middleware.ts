import { verifyTokenHelper } from '../utils/jwt.js'; // নতুন হেল্পার ইমপোর্ট

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided, access denied" });
  }

  // হেল্পার ব্যবহার করে টোকেন ভেরিফাই
  const decoded = verifyTokenHelper(token);
  
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // রিকোয়েস্ট অবজেক্টে ইউজারের ডাটা সেভ করে রাখা
  req.user = decoded;
  next();
};

export const authorize = (...roles: string[]) => {
  console.log('req.user.role', roles);
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access Denied: Only ${roles.join(' or ')} can access this.` });
    }
    next();
  };
};