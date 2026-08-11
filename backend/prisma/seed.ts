// prisma/seed.ts — Database seeder (placeholder)
// Populate with initial data (admin user, sample products, etc.)
// Run with: npm run db:seed

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("🌱 Seeding database...");

  // TODO: Seed default admin user
  // TODO: Seed sample products
  // TODO: Seed sample customers

  console.log("✅ Seeding complete.");
}

main()
  .catch((error: unknown) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
