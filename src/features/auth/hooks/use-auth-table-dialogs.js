"use client";

import { useState, useCallback } from "react";

/**
 * Manages dialog open/close state and selected record for user CRUD.
 */
export function useAuthTableDialogs() {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openCreateDialog = useCallback(() => {
    setSelectedUser(null);
    setFormDialogOpen(true);
  }, []);

  const openEditDialog = useCallback((user) => {
    setSelectedUser(user);
    setFormDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback((user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  }, []);

  const closeFormDialog = useCallback(() => {
    setFormDialogOpen(false);
    setSelectedUser(null);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  }, []);

  return {
    formDialogOpen,
    deleteDialogOpen,
    selectedUser,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeFormDialog,
    closeDeleteDialog,
  };
}
