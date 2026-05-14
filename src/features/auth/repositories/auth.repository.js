import { prisma } from "@/lib/prisma";
import { toDomain } from "@/features/auth/mappers/auth.mapper";

export async function findUserByEmail(email) {
  const entity = await prisma.user.findUnique({
    where: { email },
  });

  return toDomain(entity);
}

export async function findUserById(id) {
  const entity = await prisma.user.findUnique({
    where: { id },
  });

  return toDomain(entity);
}

/**
 * Returns raw entity with passwordHash for authentication verification.
 * Internal use only — never expose passwordHash to the client.
 */
export async function findUserWithPasswordByEmail(email) {
  const entity = await prisma.user.findUnique({
    where: { email },
  });

  return entity;
}
