import { prisma } from "@/lib/prisma";
import { toDomain } from "@/features/auth/mappers/auth.mapper";

/**
 * Creates a new user and returns the domain DTO.
 */
export async function createUser(data) {
  const entity = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      idNumber: data.idNumber,
      passwordHash: data.passwordHash,
      roleId: data.roleId,
      areaId: data.areaId ?? null,
    },
    include: { role: true },
  });

  return toDomain(entity);
}

/**
 * Updates a user and returns the domain DTO.
 */
export async function updateUser(id, data) {
  const entity = await prisma.user.update({
    where: { id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      idNumber: data.idNumber,
      roleId: data.roleId,
      areaId: data.areaId,
      isActive: data.isActive,
    },
    include: { role: true },
  });

  return toDomain(entity);
}

/**
 * Soft-deletes a user by setting isActive = false.
 */
export async function deactivateUser(id) {
  const entity = await prisma.user.update({
    where: { id },
    data: { isActive: false },
    include: { role: true },
  });

  return toDomain(entity);
}
