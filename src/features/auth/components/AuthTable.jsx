"use client";

import { AuthToolbar } from "@/features/auth/components/AuthToolbar";
import { AuthTableView } from "@/features/auth/components/AuthTableView";
import { AuthTableDialogs } from "@/features/auth/components/AuthTableDialogs";
import { useAuthTableFilters } from "@/features/auth/hooks/use-auth-table-filters";
import { useAuthTableDialogs } from "@/features/auth/hooks/use-auth-table-dialogs";

/**
 * Main user management table with toolbar, data grid and dialogs.
 *
 * @param {object} props
 * @param {Array} props.data - User list from server
 */
export function AuthTable({ data = [] }) {
  const filters = useAuthTableFilters();
  const dialogs = useAuthTableDialogs();

  // Placeholder handlers — will connect to actions when user CRUD is implemented
  const handleFormSubmit = async (values) => {
    console.log("Form submit:", values);
    dialogs.closeFormDialog();
  };

  const handleDeleteConfirm = async (user) => {
    console.log("Delete:", user.id);
    dialogs.closeDeleteDialog();
  };

  return (
    <div className="space-y-4">
      <AuthToolbar filters={filters} onOpenCreate={dialogs.openCreateDialog} />
      <AuthTableView
        data={data}
        onEdit={dialogs.openEditDialog}
        onDelete={dialogs.openDeleteDialog}
      />
      <AuthTableDialogs
        dialogs={dialogs}
        onFormSubmit={handleFormSubmit}
        onDeleteConfirm={handleDeleteConfirm}
        isSubmitting={false}
      />
    </div>
  );
}
