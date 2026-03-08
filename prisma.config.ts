import dotenv from 'dotenv';
import { defineConfig } from "prisma/config";

export default defineConfig({
  // This file is used by Prisma's CLI tools (e.g., `prisma migrate`).
  // It tells the CLI how to connect to your database.
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: "npx ts-node prisma/seed.ts",
  },
});