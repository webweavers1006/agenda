"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UI } from "@/features/auth/config/auth.constants";

const LABELS = UI.LABELS.DELETE_DIALOG;

/**
 * Confirmation dialog for deactivating a user.
 */
export function AuthDeleteDialog({ user, open, onClose, onConfirm, isPending }) {
  if (!user) return null;

  const name = `${user.firstName} ${user.lastName}`;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{LABELS.TITLE}</AlertDialogTitle>
          <AlertDialogDescription>
            {LABELS.DESCRIPTION.replace("{name}", name)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{LABELS.CANCEL}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => onConfirm(user)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {LABELS.CONFIRM}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
