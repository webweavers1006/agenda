"use client";

import { DataTable } from "@/components/shared/DataTable";
import { getUserColumns } from "@/features/auth/config/auth.columns";
import { UI } from "@/features/auth/config/auth.constants";

const LABELS = UI.LABELS.TABLE;

/**
 * Displays the user data table.
 * No extra border/bg-card wrapper — DataTable already handles its own border.
 */
export function AuthTableView({ data = [], onEdit, onDelete }) {
  const columns = getUserColumns({ onEdit, onDelete });

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage={LABELS.EMPTY}
    />
  );
}
