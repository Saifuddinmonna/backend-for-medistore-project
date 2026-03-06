import { PrismaClient, Role, UserStatus } from '../src/generated/client/client.js';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding process started...');

  // ১. এডমিন পাসওয়ার্ড হ্যাস করা
  const adminPassword = await bcrypt.hash('admin123', 10);

  // ২. এডমিন ইউজার তৈরি করা (Upsert ব্যবহার করা হয়েছে যাতে বারবার রান করলে এরর না আসে)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@medistore.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@medistore.com',
      password: adminPassword,
      role: Role.Admin,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('✅ Admin user seeded:', admin.email);

  // ৩. কিছু ডিফল্ট ক্যাটাগরি তৈরি করা
  const categories = [
    'Pain Relief',
    'Vitamins & Supplements',
    'Diabetes Care',
    'Baby Care',
    'Personal Care',
    'OTC Medicines'
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Categories seeded:', categories.length);

  // ৪. স্যাম্পল সেলার তৈরি করা (টেস্টিং এর জন্য)
  const sellerPassword = await bcrypt.hash('seller123', 10);
  await prisma.user.upsert({
    where: { email: 'seller@medistore.com' },
    update: {},
    create: {
      name: 'Pharmacy One',
      email: 'seller@medistore.com',
      password: sellerPassword,
      role: Role.Seller,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('✅ Sample seller seeded: seller@medistore.com');

  console.log('✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });