"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Manages search + filter state with URL sync and debounce.
 * Dual state pattern: local state for instant UI, URL sync with 400ms debounce.
 */
export function useAuthTableFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [roleFilter, setRoleFilter] = useState(searchParams.get("role") ?? "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? "");

  // Debounced URL sync
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) params.set("search", search);
      else params.delete("search");

      if (roleFilter) params.set("role", roleFilter);
      else params.delete("role");

      if (statusFilter) params.set("status", statusFilter);
      else params.delete("status");

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, roleFilter, statusFilter, router, searchParams]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setRoleFilter("");
    setStatusFilter("");
  }, []);

  return {
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    clearFilters,
  };
}
