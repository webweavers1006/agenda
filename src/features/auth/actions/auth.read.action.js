"use server";

import { createProtectedFunction } from "@/features/shared/lib/safe-action";
import { getCurrentUser } from "@/features/auth/services/auth.read.service";

/**
 * Returns the current authenticated user's profile data.
 */
export const getCurrentUserAction = createProtectedFunction({
  handler: async (_input, session) => {
    const user = await getCurrentUser(session.id);
    if (!user) {
      return { success: false, error: "Usuario no encontrado." };
    }
    return { success: true, data: user };
  },
});
