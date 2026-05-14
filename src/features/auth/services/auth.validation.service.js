import { ERRORS } from "@/features/auth/config/auth.constants";

/**
 * Validates business rules for authentication.
 * Structural validation (Zod) is handled in actions/.
 */

export function validateUserActive(user) {
  if (!user) {
    return { valid: false, error: ERRORS.INVALID_CREDENTIALS };
  }

  if (!user.isActive) {
    return { valid: false, error: ERRORS.USER_INACTIVE };
  }

  return { valid: true, error: null };
}
