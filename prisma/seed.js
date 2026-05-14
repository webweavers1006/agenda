import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@agenda.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@agenda.com",
      passwordHash,
      role: "admin",
      isActive: true,
    },
  });

  console.log("Seed completed. Admin user:", admin.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
