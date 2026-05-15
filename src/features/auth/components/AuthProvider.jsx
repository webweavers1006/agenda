"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext(null);

/**
 * Provides session user data to the auth feature subtree.
 */
export function AuthProvider({ user, children }) {
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access the current authenticated user from context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    return null; // User not authenticated or provider not mounted
  }
  return context;
}
