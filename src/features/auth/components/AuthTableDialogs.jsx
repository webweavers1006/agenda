"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { AuthDeleteDialog } from "@/features/auth/components/AuthDeleteDialog";
import { UI } from "@/features/auth/config/auth.constants";

const LABELS = UI.LABELS.FORM;

/**
 * Manages both the form dialog (create/edit) and the delete confirmation dialog.
 */
export function AuthTableDialogs({
  dialogs,
  onFormSubmit,
  onDeleteConfirm,
  isSubmitting,
}) {
  const { formDialogOpen, deleteDialogOpen, selectedUser, closeFormDialog, closeDeleteDialog } = dialogs;

  return (
    <>
      <Dialog open={formDialogOpen} onOpenChange={closeFormDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? LABELS.EDIT_TITLE : LABELS.CREATE_TITLE}
            </DialogTitle>
          </DialogHeader>
          <AuthForm
            user={selectedUser}
            onSubmit={onFormSubmit}
            isPending={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <AuthDeleteDialog
        user={selectedUser}
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={onDeleteConfirm}
        isPending={isSubmitting}
      />
    </>
  );
}
