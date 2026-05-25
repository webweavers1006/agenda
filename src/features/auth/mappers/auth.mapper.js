/**
 * Maps Prisma User entities to domain DTOs and vice versa.
 * All field names are in English thanks to Prisma @map.
 */

export function toDomain(entity) {
  if (!entity) return null;

  return {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
    idNumber: entity.idNumber,
    role: entity.role?.name ?? null,
    isActive: entity.isActive,
    areaId: entity.areaId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export function toDomainList(entities) {
  return entities.map(toDomain);
}

export function toPersistence(domain) {
  return {
    firstName: domain.firstName,
    lastName: domain.lastName,
    email: domain.email,
    idNumber: domain.idNumber,
    passwordHash: domain.passwordHash,
    roleId: domain.roleId,
    areaId: domain.areaId,
    isActive: domain.isActive,
  };
}

export function toSortKey(domainKey) {
  const sortMap = {
    firstName: { firstName: "asc" },
    lastName: { lastName: "asc" },
    email: { email: "asc" },
    role: { role: { name: "asc" } },
    isActive: { isActive: "desc" },
    createdAt: { createdAt: "desc" },
  };

  return sortMap[domainKey] ?? { createdAt: "desc" };
}

export function toSessionPayload(user) {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
  };
}
