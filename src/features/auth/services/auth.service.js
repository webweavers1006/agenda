import bcrypt from "bcryptjs";
import { findUserByEmail, findUserWithPasswordByEmail } from "@/features/auth/repositories/auth.repository";
import { validateUserActive } from "@/features/auth/services/auth.validation.service";
import { toSessionPayload } from "@/features/auth/mappers/auth.mapper";
import { ERRORS } from "@/features/auth/config/auth.constants";

export async function authenticateUser(email, password) {
  const user = await findUserByEmail(email);

  const validation = validateUserActive(user);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const entity = await findUserWithPasswordByEmail(email);
  const passwordValid = await bcrypt.compare(password, entity.passwordHash);
  if (!passwordValid) {
    return { success: false, error: ERRORS.INVALID_CREDENTIALS };
  }

  return {
    success: true,
    payload: toSessionPayload(user),
    error: null,
  };
}
