/**
 * Maps Prisma User entities to domain DTOs and vice versa.
 * All field names are in English thanks to Prisma @map.
 */

export function toDomain(entity) {
  if (!entity) return null;

  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,
    role: entity.role,
    isActive: entity.isActive,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export function toDomainList(entities) {
  return entities.map(toDomain);
}

export function toPersistence(domain) {
  return {
    name: domain.name,
    email: domain.email,
    passwordHash: domain.passwordHash,
    role: domain.role,
    isActive: domain.isActive,
  };
}

export function toSortKey(domainKey) {
  const sortMap = {
    name: { name: "asc" },
    email: { email: "asc" },
    role: { role: "asc" },
    createdAt: { createdAt: "desc" },
  };

  return sortMap[domainKey] ?? { createdAt: "desc" };
}

export function toSessionPayload(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
