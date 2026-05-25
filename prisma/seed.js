import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@agenda.com" },
    update: {},
    create: {
      firstName: "Administrador",
      lastName: "Sistema",
      email: "admin@agenda.com",
      idNumber: "V-00000000",
      passwordHash,
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
