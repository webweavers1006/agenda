import { getSession } from "@/features/shared/lib/session";

/**
 * Wraps a server action with session verification and optional permission checks.
 *
 * @param {object} options
 * @param {string[]} [options.permissions] - Required permission slugs.
 * @param {Function} options.handler - The action handler receiving (validatedInput, session).
 * @returns {Function} A server action callable from client components.
 */
export function createProtectedAction({ permissions = [], handler }) {
  return async function protectedAction(input) {
    const session = await getSession();
    if (!session) {
      return { success: false, error: "Tu sesión ha expirado. Inicia sesión nuevamente." };
    }

    // Permission check placeholder — will be implemented when roles/permissions module is built
    if (permissions.length > 0) {
      // TODO: verify user has all required permissions via role/permission system
    }

    try {
      return await handler(input, session);
    } catch (error) {
      return {
        success: false,
        error: error.message ?? "Error interno del servidor.",
      };
    }
  };
}

/**
 * Wraps a read function (non-mutating) with session verification.
 * For use in Server Components or read actions.
 *
 * @param {object} options
 * @param {Function} options.handler - The handler receiving (input, session).
 * @returns {Function}
 */
export function createProtectedFunction({ handler }) {
  return async function protectedFunction(input) {
    const session = await getSession();
    if (!session) {
      return { success: false, error: "Tu sesión ha expirado. Inicia sesión nuevamente." };
    }

    try {
      return await handler(input, session);
    } catch (error) {
      return {
        success: false,
        error: error.message ?? "Error interno del servidor.",
      };
    }
  };
}
