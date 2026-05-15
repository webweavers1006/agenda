"use cache";

import { findUserById } from "@/features/auth/repositories/auth.read.repository";

/**
 * Retrieves the current authenticated user by ID.
 * Cached at the service level via "use cache".
 */
export async function getCurrentUser(userId) {
  if (!userId) return null;
  return findUserById(userId);
}
