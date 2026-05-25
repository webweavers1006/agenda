"use client";

import { Toolbar } from "@/components/shared/Toolbar";
import { UI } from "@/features/auth/config/auth.constants";

const LABELS = UI.LABELS.TOOLBAR;

/**
 * Toolbar for user management: search, role filter, status filter, new button.
 */
export function AuthToolbar({ filters, onOpenCreate }) {
  return (
    <Toolbar>
      <Toolbar.SearchInput
        value={filters.search}
        onChange={filters.setSearch}
        placeholder={LABELS.SEARCH_PLACEHOLDER}
      />
      <Toolbar.FilterSelect
        value={filters.roleFilter}
        onChange={filters.setRoleFilter}
        placeholder={LABELS.FILTER_ROLE}
        options={[
          { value: "admin", label: "Admin" },
          { value: "user", label: "Usuario" },
        ]}
      />
      <Toolbar.FilterSelect
        value={filters.statusFilter}
        onChange={filters.setStatusFilter}
        placeholder={LABELS.FILTER_STATUS}
        options={[
          { value: "active", label: "Activo" },
          { value: "inactive", label: "Inactivo" },
        ]}
      />
      <Toolbar.NewButton onClick={onOpenCreate}>
        {LABELS.NEW_BUTTON}
      </Toolbar.NewButton>
    </Toolbar>
  );
}
