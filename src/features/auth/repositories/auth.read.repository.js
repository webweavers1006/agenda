import { prisma } from "@/lib/prisma";
import { toDomain } from "@/features/auth/mappers/auth.mapper";

/**
 * Finds a user by email (domain DTO, no passwordHash).
 */
export async function findUserByEmail(email) {
  const entity = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  return toDomain(entity);
}

/**
 * Finds a user by ID (domain DTO, no passwordHash).
 */
export async function findUserById(id) {
  const entity = await prisma.user.findUnique({
    where: { id },
    include: { role: true },
  });

  return toDomain(entity);
}

/**
 * Returns raw User entity with passwordHash for authentication.
 * Internal use only — never expose passwordHash to the client.
 */
export async function findUserWithPasswordByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}
