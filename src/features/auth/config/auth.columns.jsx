"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { UI } from "@/features/auth/config/auth.constants";

const LABELS = UI.LABELS.TABLE;

/**
 * Creates a standard actions column for user DataTable.
 */
export function createActionsColumn({ onEdit, onDelete }) {
  return {
    id: "actions",
    header: LABELS.ACTIONS,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(user)}
            title="Editar"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(user)}
            title="Desactivar"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      );
    },
  };
}

/**
 * Column definitions for user DataTable.
 */
export function getUserColumns({ onEdit, onDelete }) {
  return [
    {
      accessorKey: "firstName",
      header: LABELS.FIRST_NAME,
    },
    {
      accessorKey: "lastName",
      header: LABELS.LAST_NAME,
    },
    {
      accessorKey: "email",
      header: LABELS.EMAIL,
    },
    {
      accessorKey: "idNumber",
      header: LABELS.ID_NUMBER,
    },
    {
      accessorKey: "role",
      header: LABELS.ROLE,
    },
    {
      accessorKey: "isActive",
      header: LABELS.IS_ACTIVE,
      cell: ({ row }) => (row.original.isActive ? "Sí" : "No"),
    },
    createActionsColumn({ onEdit, onDelete }),
  ];
}
