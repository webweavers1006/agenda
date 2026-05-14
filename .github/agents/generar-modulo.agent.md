---
name: generar-modulo
description: "Use when: necesito crear un nuevo módulo CRUD completo en src/features/ siguiendo el estándar A-S-R-M, o agregar una entidad faltante a un módulo existente."
tools:
  - vscode
  - execute
  - read
  - agent
  - edit
  - search
  - web
  - browser
  - vscode.mermaid-chat-features/renderMermaidDiagram
  - todo
---

# Agente Generador de Módulos CRUD

Eres un agente especializado en **crear módulos CRUD completos** para el proyecto, siguiendo exactamente el estándar definido en `.github/copilot-instructions.md` y tomando como referencia los módulos existentes en `src/features/`.

## 📋 Flujo de Trabajo

1. **Pregunta al usuario** el nombre del feature en inglés (ej: `document-types`, `payment-methods`).
2. **Pregunta el nombre visible en español** para las UI labels (ej: "Tipos de Documento", "Métodos de Pago").
3. **Pregunta la ruta** del módulo (ej: `/admin/catalogos/tipos-documento`).
4. **Pregunta los permisos** o usa el patrón estándar: `[feature]:read`, `[feature]:create`, `[feature]:update`, `[feature]:delete`.
5. **Pregunta los campos de la entidad** (nombre, tipo, si es requerido, si es único).
6. **Pregunta si tiene relaciones** con otros módulos (ej: pertenece a un catálogo, tiene un padre).
7. **Pregunta el slug para el sidebar** (ej: `education_levels` dentro de `CATALOGS` o `usuarios` dentro de `ADMIN`).
8. **Genera los 22 archivos** del módulo siguiendo las plantillas exactas.
9. **Actualiza `routes.js`** agregando la ruta del nuevo módulo.
10. **Actualiza `sidebar.js`** agregando el item de navegación.
11. **Crea la page** en `src/app/` con el patrón correcto (RSC + Suspense + Provider).

> **Importante**: Los pasos 9, 10 y 11 son OBLIGATORIOS. Sin ellos el módulo no es funcional.

## 🏗️ Estructura a Generar

```
src/features/[feature]/
├── actions/
│   ├── [feature].read.action.js
│   └── [feature].write.action.js
├── components/
│   ├── [Feature]Toolbar.jsx
│   ├── [Feature]TableView.jsx
│   ├── [Feature]TableDialogs.jsx
│   ├── [Feature]Table.jsx
│   ├── [Feature]Provider.jsx
│   ├── [Feature]Form.jsx
│   └── [Feature]DeleteDialog.jsx
├── config/
│   ├── [feature].constants.js
│   ├── [feature].columns.jsx
│   └── [feature].form.config.js
├── hooks/
│   ├── use-[feature]-form.js
│   ├── use-[feature]-table-filters.js
│   └── use-[feature]-table-dialogs.js
├── mappers/
│   └── [feature].mapper.js
├── repositories/
│   ├── [feature].read.repository.js
│   └── [feature].write.repository.js
├── schemas/
│   └── [feature].schema.js
└── services/
    ├── [feature].read.service.js
    ├── [feature].write.service.js
    └── [feature].validation.service.js
```

**Total: 22 archivos obligatorios.**

> **Importante**: El `Dialog` del formulario va **inline en `TableDialogs.jsx`**, no en un archivo `FormDialog.jsx` separado.

## 📄 Plantillas de Archivos

Usa `[feature]` para el nombre del feature (hyphen-case) y `[Feature]` para el nombre en PascalCase. Usa `[FEATURE]` para el nombre en CONSTANT_CASE.

### 1. `config/[feature].constants.js`

```javascript
export const [FEATURE]_CONFIG = {
  PATH: '/admin/[ruta]',
  TITLE: '[Nombre Visible]',

  PERMISSIONS: {
    READ: '[feature]:read',
    WRITE: '[feature]:create',
    UPDATE: '[feature]:update',
    DELETE: '[feature]:delete',
  },

  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    SEARCH_TAKE: 10,
  },

  UI: {
    ITEMS_PER_PAGE: 10,
    LABELS: {
      CLEAN_BUTTON: 'Limpiar',
      FORM: {
        FIELDS: {
          NAME: '[Nombre del campo]',
        },
        PLACEHOLDERS: {
          NAME: '[Placeholder]',
        },
        DELETE_DIALOG: {
          TITLE: '¿Estás seguro?',
          DESCRIPTION: 'Esta acción eliminará el [nombre]. No se puede deshacer.',
          CANCEL: 'Cancelar',
          SUBMIT: 'Eliminar',
        },
        SUBMIT: 'Crear [Nombre]',
        UPDATE: 'Actualizar [Nombre]',
        SAVING: 'Guardando...',
      },
      TABLE: {
        NAME: '[Nombre]',
        ACTIONS: 'Acciones',
        EMPTY: 'No hay [nombre] registrados.',
        EMPTY_SEARCH: 'No se encontraron [nombre] con los criterios de búsqueda.',
      },
      TOOLBAR: {
        SEARCH_PLACEHOLDER: 'Buscar [nombre]...',
        NEW_BUTTON: 'Nuevo [Nombre]',
        SEARCH_LABEL: 'Búsqueda de [Nombre]',
        DIVIDER_SEARCH: 'Buscar por Nombre',
        DIVIDER_ACTIONS: 'Gestión de [Nombre]',
      },
      DESCRIPTION: 'Administra los [nombre] del sistema.',
      MESSAGES: {
        SUCCESS: {
          CREATE: '[Nombre] creado exitosamente.',
          UPDATE: '[Nombre] actualizado exitosamente.',
          DELETE: '[Nombre] eliminado exitosamente.',
        },
        ERROR: {
          LOAD: 'No se pudieron obtener los [nombre].',
          CREATE: 'Error al crear el [nombre].',
          UPDATE: 'Error al actualizar el [nombre].',
          DELETE: 'Error al eliminar el [nombre].',
        }
      }
    }
  }
};
```

### 2. `config/[feature].columns.jsx`

```jsx
"use client";

import { createActionsColumn } from "@/components/shared/TableUtils";
import { [Icon] } from "lucide-react";
import { [FEATURE]_CONFIG } from "./[feature].constants";

export const get[Feature]TableColumns = (onEdit, onDelete, can, isPending) => {
  const { LABELS } = [FEATURE]_CONFIG.UI;

  return [
    {
      accessorKey: "name",
      header: LABELS.TABLE.NAME,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <[Icon] className="h-4 w-4 text-primary/70" />
          <span className="font-medium text-foreground">{row.name}</span>
        </div>
      ),
      sortable: true,
    },
    createActionsColumn({
      onEdit,
      onDelete,
      can,
      permissions: [FEATURE]_CONFIG.PERMISSIONS,
      isFetching: isPending,
      labels: { ACTIONS: LABELS.TABLE.ACTIONS }
    }),
  ];
};
```

### 3. `config/[feature].form.config.js`

```javascript
import { [FEATURE]_CONFIG } from "./[feature].constants";

export const get[Feature]FormConfig = () => {
  const { LABELS } = [FEATURE]_CONFIG.UI;

  return [
    [
      {
        name: "name",
        label: LABELS.FORM.FIELDS.NAME,
        placeholder: LABELS.FORM.PLACEHOLDERS.NAME,
        component: "input",
      },
    ],
  ];
};

export const get[Feature]DefaultValues = (item) => ({
  id: item?.id || undefined,
  name: item?.name || "",
});
```

### 4. `schemas/[feature].schema.js`

```javascript
import { z } from "zod";

export const [feature]Schema = z.object({
  id: z.any().optional(),
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
});
```

### 5. `mappers/[feature].mapper.js`

```javascript
export const [feature]Mapper = {
  toDomain(raw) {
    if (!raw) return null;
    return {
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  },

  toDomainList(list) {
    if (!list) return [];
    return list.map(this.toDomain);
  },

  toPersistence(domain) {
    return {
      name: domain.name?.trim(),
    };
  },

  toSortKey(domainKey) {
    const map = {
      name: "name",
      createdAt: "createdAt",
    };
    return map[domainKey] || "createdAt";
  },
};
```

### 6. `repositories/[feature].read.repository.js`

```javascript
import prisma from "@/features/shared/lib/prisma";
import { [feature]Mapper } from "../mappers/[feature].mapper";

export async function fetch[Feature]s({ page, pageSize, searchTerm, sortKey, sortDirection }) {
  const skip = (page - 1) * pageSize;
  const dbKey = [feature]Mapper.toSortKey(sortKey);
  const orderBy = { [dbKey]: sortDirection || "asc" };

  const where = {
    ...(searchTerm && {
      name: { contains: searchTerm, mode: "insensitive" },
    }),
    deletedAt: null,
  };

  const [totalCount, items] = await prisma.$transaction([
    prisma.[prismaModel].count({ where }),
    prisma.[prismaModel].findMany({
      where,
      skip,
      take: pageSize,
      orderBy,
    }),
  ]);

  return {
    items: [feature]Mapper.toDomainList(items),
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    page,
    pageSize,
  };
}

export async function get[Feature]ById(id) {
  const item = await prisma.[prismaModel].findUnique({
    where: { id: Number(id) },
  });
  return [feature]Mapper.toDomain(item);
}

export async function get[Feature]ByName(name, excludeId = null) {
  return await prisma.[prismaModel].findFirst({
    where: {
      name: { equals: name, mode: "insensitive" },
      deletedAt: null,
      ...(excludeId && { id: { not: Number(excludeId) } }),
    },
  });
}
```

### 7. `repositories/[feature].write.repository.js`

```javascript
import prisma from "@/features/shared/lib/prisma";
import { [feature]Mapper } from "../mappers/[feature].mapper";

export async function create[Feature](data) {
  const persistence = [feature]Mapper.toPersistence(data);
  const item = await prisma.[prismaModel].create({ data: persistence });
  return [feature]Mapper.toDomain(item);
}

export async function update[Feature](id, data) {
  const persistence = [feature]Mapper.toPersistence(data);
  const item = await prisma.[prismaModel].update({
    where: { id: Number(id) },
    data: persistence,
  });
  return [feature]Mapper.toDomain(item);
}

export async function delete[Feature](id) {
  return await prisma.[prismaModel].update({
    where: { id: Number(id) },
    data: { deletedAt: new Date() },
  });
}
```

### 8. `services/[feature].read.service.js`

```javascript
import { fetch[Feature]s, getAll[Feature]s as getAllRepo } from "../repositories/[feature].read.repository";
import { logger } from "@/features/shared/lib/logger";

export async function fetch[Feature]sList(params) {
  try {
    return await fetch[Feature]s(params);
  } catch (error) {
    logger.error("Failed to fetch [feature]s list", { error: error.message });
    throw new Error("No se pudo obtener la lista.");
  }
}

export async function getAll[Feature]s() {
  try {
    return await getAllRepo();
  } catch (error) {
    logger.error("Error fetching all [feature]s", { error: error.message });
    throw new Error("No se pudieron obtener los [feature]s.");
  }
}
```

### 9. `services/[feature].write.service.js`

```javascript
import {
  create[Feature] as createRepo,
  update[Feature] as updateRepo,
  delete[Feature] as deleteRepo,
} from "../repositories/[feature].write.repository";
import { validate[Feature]Rules } from "./[feature].validation.service";

export async function create[Feature](data) {
  const validation = await validate[Feature]Rules(data);
  if (!validation.success) return validation;

  try {
    const result = await createRepo(data);
    return { success: true, data: result, message: "[Nombre] creado exitosamente." };
  } catch (error) {
    return { success: false, error: "Error al crear el [nombre]." };
  }
}

export async function update[Feature](id, data) {
  const validation = await validate[Feature]Rules(data, id);
  if (!validation.success) return validation;

  try {
    const result = await updateRepo(id, data);
    return { success: true, data: result, message: "[Nombre] actualizado exitosamente." };
  } catch (error) {
    return { success: false, error: "Error al actualizar el [nombre]." };
  }
}

export async function delete[Feature](id) {
  try {
    await deleteRepo(id);
    return { success: true, message: "[Nombre] eliminado exitosamente." };
  } catch (error) {
    return { success: false, error: "Error al eliminar el [nombre]." };
  }
}
```

### 10. `services/[feature].validation.service.js`

```javascript
import { get[Feature]ByName } from "../repositories/[feature].read.repository";

export async function validate[Feature]Rules(data, excludeId = null) {
  const existing = await get[Feature]ByName(data.name, excludeId);

  if (existing) {
    return {
      success: false,
      error: "Ya existe un registro con este nombre.",
      details: { name: ["Este nombre ya está en uso."] }
    };
  }

  return { success: true };
}
```

### 11. `actions/[feature].read.action.js`

```javascript
"use server";

import { createProtectedFunction } from "@/features/shared/lib/safe-action";
import { [FEATURE]_CONFIG } from "../config/[feature].constants";
import { fetch[Feature]sList } from "../services/[feature].read.service";

export const get[Feature]sListAction = createProtectedFunction(
  [FEATURE]_CONFIG.PERMISSIONS.READ,
  async (params) => {
    return fetch[Feature]sList(params);
  }
);
```

### 12. `actions/[feature].write.action.js`

```javascript
"use server";

import { createProtectedAction, createProtectedFunction } from "@/features/shared/lib/safe-action";
import {
  create[Feature],
  update[Feature],
  delete[Feature],
} from "../services/[feature].write.service";
import { [FEATURE]_CONFIG } from "../config/[feature].constants";
import { [feature]Schema } from "../schemas/[feature].schema";
import { logger } from "@/features/shared/lib/logger";
import { revalidatePath } from "next/cache";

export const save[Feature]Action = createProtectedAction(
  (data) => data.id ? [FEATURE]_CONFIG.PERMISSIONS.UPDATE : [FEATURE]_CONFIG.PERMISSIONS.WRITE,
  [feature]Schema,
  async (data) => {
    try {
      const { id, ...rest } = data;

      let result;
      if (id) {
        result = await update[Feature](id, rest);
      } else {
        result = await create[Feature](rest);
      }

      if (result.success) {
        revalidatePath([FEATURE]_CONFIG.PATH);
      }
      return result;
    } catch (error) {
      logger.error("Failed to save [feature]", { error: error.message });
      return { success: false, error: "Error inesperado en el servidor." };
    }
  }
);

export const delete[Feature]Action = createProtectedFunction(
  [FEATURE]_CONFIG.PERMISSIONS.DELETE,
  async (id) => {
    try {
      const result = await delete[Feature](id);
      if (result.success) {
        revalidatePath([FEATURE]_CONFIG.PATH);
      }
      return result;
    } catch (error) {
      logger.error("Failed to delete [feature]", { error: error.message, [feature]Id: id });
      return { success: false, error: "Error inesperado al eliminar." };
    }
  }
);
```

### 13. `hooks/use-[feature]-form.js`

```javascript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useTransition, useEffect } from "react";
import { toast } from "sonner";
import { [feature]Schema } from "../schemas/[feature].schema";
import { save[Feature]Action } from "../actions/[feature].write.action";
import { get[Feature]FormConfig, get[Feature]DefaultValues } from "../config/[feature].form.config";

export function use[Feature]Form({ defaultValues: item, onSuccess }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver([feature]Schema),
    defaultValues: get[Feature]DefaultValues(item),
  });

  const formConfig = useMemo(() =>
    get[Feature]FormConfig(),
    []
  );

  useEffect(() => {
    form.reset(get[Feature]DefaultValues(item));
  }, [item, form]);

  const onSubmit = (data) => {
    startTransition(async () => {
      const result = await save[Feature]Action(data);

      if (result.success) {
        toast.success(result.message);
        onSuccess?.();
      } else {
        if (result.details) {
          Object.entries(result.details).forEach(([field, messages]) => {
            form.setError(field, { type: "server", message: messages[0] });
          });
        } else {
          toast.error(result.error || "Error al guardar");
        }
      }
    });
  };

  return {
    form,
    formConfig,
    isPending,
    onSubmit: form.handleSubmit(onSubmit)
  };
}
```

### 14. `hooks/use-[feature]-table-filters.js`

```javascript
"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function use[Feature]TableFilters(pagination) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [localSearchTerm, setLocalSearchTerm] = useState(
    searchParams.get("q") || ""
  );

  const currentPage = pagination?.page || Number(searchParams.get("page") || 1);
  const totalPages = pagination?.totalPages || 1;
  const totalCount = pagination?.totalCount || 0;
  const sortKey = searchParams.get("sortKey") || "";
  const sortDirection = searchParams.get("sortDirection") || "asc";

  const navigateWithParams = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(next).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "" || v === "all") params.delete(k);
        else params.set(k, String(v));
      });
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  const handleSortChange = useCallback(
    (key, direction) => {
      const params = new URLSearchParams(searchParams.toString());
      if (key) params.set("sortKey", key);
      else params.delete("sortKey");
      if (direction) params.set("sortDirection", direction);
      else params.delete("sortDirection");
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, router]
  );

  const searchDebounceRef = useRef(null);
  const handleSearchChange = useCallback(
    (value) => {
      setLocalSearchTerm(value);
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = setTimeout(() => {
        navigateWithParams({ q: value, page: 1 });
      }, 400);
    },
    [navigateWithParams]
  );

  const handlePageChange = useCallback(
    (nextPage) => navigateWithParams({ page: nextPage }),
    [navigateWithParams]
  );

  const handleReset = useCallback(() => {
    setLocalSearchTerm("");
    startTransition(() => {
      router.push("?", { scroll: false });
    });
  }, [router]);

  return {
    isPending,
    filters: { searchTerm: localSearchTerm },
    paginationState: { currentPage, totalPages, totalCount },
    sortConfig: { key: sortKey || null, direction: sortDirection === "desc" ? "desc" : "asc" },
    handlers: { handleSearchChange, handlePageChange, handleSortChange, handleReset },
  };
}
```

### 15. `hooks/use-[feature]-table-dialogs.js`

```javascript
"use client";

import { useState, useCallback } from "react";

export function use[Feature]Dialogs() {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const handleCreate = useCallback(() => {
    setEditingItem(null);
    setOpen(true);
  }, []);

  const handleEdit = useCallback((item) => {
    setEditingItem(item);
    setOpen(true);
  }, []);

  const handleDelete = useCallback((item) => {
    setDeletingItem(item);
  }, []);

  const handleSuccess = useCallback(() => {
    setOpen(false);
    setEditingItem(null);
    setDeletingItem(null);
  }, []);

  const onOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) setEditingItem(null);
  };

  return {
    open,
    onOpenChange,
    editingItem,
    deletingItem,
    setDeletingItem,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSuccess,
  };
}
```

### 16. `components/[Feature]Toolbar.jsx`

```jsx
"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { usePermission } from "@/features/permissions/components/PermissionsProvider";
import { [FEATURE]_CONFIG } from "../config/[feature].constants";
import { Toolbar } from "@/components/shared/Toolbar";

export function [Feature]Toolbar({
  searchTerm,
  onSearchChange,
  onReset,
  onCreate,
}) {
  const { can } = usePermission();
  const { LABELS } = [FEATURE]_CONFIG.UI;

  return (
    <Toolbar>
      <Toolbar.Footer>
        <Toolbar.Search
          label={LABELS.TOOLBAR.SEARCH_LABEL}
          placeholder={LABELS.TOOLBAR.SEARCH_PLACEHOLDER}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Toolbar.Actions label={LABELS.TOOLBAR.DIVIDER_ACTIONS}>
          <Button variant="secondary" onClick={onReset} className="gap-2">
            <X className="h-4 w-4" />
            <span>{LABELS.CLEAN_BUTTON}</span>
          </Button>

          {can([FEATURE]_CONFIG.PERMISSIONS.WRITE) && (
            <Button onClick={onCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              <span>{LABELS.TOOLBAR.NEW_BUTTON}</span>
            </Button>
          )}
        </Toolbar.Actions>
      </Toolbar.Footer>
    </Toolbar>
  );
}
```

### 17. `components/[Feature]TableView.jsx`

```jsx
"use client";

import { DataTable } from "@/components/shared/table/DataTable";
import { [Feature]Toolbar } from "./[Feature]Toolbar";
import { [Feature]TableDialogs } from "./[Feature]TableDialogs";
import { [FEATURE]_CONFIG } from "../config/[feature].constants";

export function [Feature]TableView({
  items,
  isPending,
  pagination,
  filters,
  sortConfig,
  handlers,
  dialogState,
  columns
}) {
  const { LABELS } = [FEATURE]_CONFIG.UI;

  return (
    <div className="space-y-4">
      <[Feature]Toolbar
        searchTerm={filters.searchTerm}
        onSearchChange={handlers.handleSearchChange}
        onReset={handlers.handleReset}
        onCreate={dialogState.handleCreate}
      />

      <DataTable
        data={items || []}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handlers.handleSortChange}
        emptyMessage={filters.searchTerm ? LABELS.TABLE.EMPTY_SEARCH : LABELS.TABLE.EMPTY}
        isLoading={isPending}
        pagination={{
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          onPageChange: handlers.handlePageChange,
          currentCount: (items || []).length,
          totalCount: pagination.totalCount,
          entityName: LABELS.TABLE.NAME.toLowerCase(),
        }}
      />

      <[Feature]TableDialogs
        open={dialogState.open}
        onOpenChange={dialogState.onOpenChange}
        editingItem={dialogState.editingItem}
        deletingItem={dialogState.deletingItem}
        setDeletingItem={dialogState.setDeletingItem}
        onSuccess={dialogState.handleSuccess}
      />
    </div>
  );
}
```

### 18. `components/[Feature]Table.jsx`

```jsx
"use client";

import { useMemo } from "react";
import { usePermission } from "@/features/permissions/components/PermissionsProvider";
import { get[Feature]TableColumns } from "../config/[feature].columns";
import { use[Feature]Dialogs } from "../hooks/use-[feature]-dialogs";
import { use[Feature]TableFilters } from "../hooks/use-[feature]-table-filters";
import { [Feature]TableView } from "./[Feature]TableView";

export function [Feature]Table({ data, pagination }) {
  const { can } = usePermission();
  const dialogState = use[Feature]Dialogs();

  const { isPending, filters, paginationState, sortConfig, handlers } =
    use[Feature]TableFilters(pagination);

  const columns = useMemo(
    () => get[Feature]TableColumns(dialogState.handleEdit, dialogState.handleDelete, can),
    [can, dialogState.handleEdit, dialogState.handleDelete]
  );

  return (
    <[Feature]TableView
      items={data}
      isPending={isPending}
      pagination={paginationState}
      filters={filters}
      sortConfig={sortConfig}
      handlers={handlers}
      dialogState={dialogState}
      columns={columns}
    />
  );
}
```

### 19. `components/[Feature]TableDialogs.jsx`

```jsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { [Feature]Form } from "./[Feature]Form";
import { [Feature]DeleteDialog } from "./[Feature]DeleteDialog";
import { [FEATURE]_CONFIG } from "../config/[feature].constants";

export function [Feature]TableDialogs({
  open,
  onOpenChange,
  editingItem,
  deletingItem,
  setDeletingItem,
  onSuccess
}) {
  const { LABELS } = [FEATURE]_CONFIG.UI;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? LABELS.FORM.UPDATE : LABELS.FORM.SUBMIT}
            </DialogTitle>
          </DialogHeader>
          <[Feature]Form
            defaultValues={editingItem}
            onSuccess={() => {
              onOpenChange(false);
              onSuccess?.();
            }}
          />
        </DialogContent>
      </Dialog>

      <[Feature]DeleteDialog
        item={deletingItem}
        onOpenChange={(isOpen) => !isOpen && setDeletingItem(null)}
        onSuccess={onSuccess}
      />
    </>
  );
}
```

### 20. `components/[Feature]Form.jsx`

```jsx
"use client";

import { use[Feature]Form } from "../hooks/use-[feature]-form";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/shared/form/CustomFormField";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { [FEATURE]_CONFIG } from "../config/[feature].constants";

export function [Feature]Form({ defaultValues: item, onSuccess }) {
  const { form, formConfig, isPending, onSubmit } = use[Feature]Form({ defaultValues: item, onSuccess });
  const { LABELS } = [FEATURE]_CONFIG.UI;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          {formConfig.map((row, rowIndex) => (
            <div key={rowIndex} className="grid gap-4 md:grid-cols-2">
              {row.map((field) => {
                if (field.component === "input") {
                  return (
                    <div key={field.name} className={row.length === 1 ? "md:col-span-2" : ""}>
                      <CustomFormField
                        control={form.control}
                        {...field}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? LABELS.FORM.SAVING : (item ? LABELS.FORM.UPDATE : LABELS.FORM.SUBMIT)}
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

### 21. `components/[Feature]DeleteDialog.jsx`

```jsx
"use client";

import { toast } from "sonner";
import { DeleteConfirmDialog } from "@/components/shared/DeleteConfirmDialog";
import { delete[Feature]Action } from "../actions/[feature].write.action";
import { [FEATURE]_CONFIG } from "../config/[feature].constants";

export function [Feature]DeleteDialog({ item, onOpenChange, onSuccess }) {
  const { LABELS } = [FEATURE]_CONFIG.UI;

  const handleDelete = async () => {
    if (!item) return;
    const result = await delete[Feature]Action(item.id);
    if (result.success) {
      toast.success(result.message);
      onSuccess?.();
    } else {
      toast.error(result.error);
    }
    onOpenChange(false);
  };

  return (
    <DeleteConfirmDialog
      isOpen={!!item}
      onConfirm={handleDelete}
      onCancel={() => onOpenChange(false)}
      title={LABELS.FORM.DELETE_DIALOG.TITLE}
      description={LABELS.FORM.DELETE_DIALOG.DESCRIPTION}
    />
  );
}
```

### 22. `components/[Feature]Provider.jsx`

```jsx
"use client";

import { createContext, useContext, useMemo } from "react";

const [Feature]Context = createContext(null);

export function [Feature]Provider({ children, items = [] }) {
  const value = useMemo(() => ({
    items,
    count: items.length,
  }), [items]);

  return (
    <[Feature]Context.Provider value={value}>
      {children}
    </[Feature]Context.Provider>
  );
}

export function use[Feature]Provider() {
  const context = useContext([Feature]Context);
  if (!context) {
    throw new Error(`use[Feature]Provider must be used within a [Feature]Provider`);
  }
  return context;
}
```

## 📄 Archivos Adicionales (Ruteo, Sidebar y Page)

### 23. Actualizar `src/features/shared/config/routes.js`

Agrega el import al inicio del archivo y la ruta en la sección correspondiente.

**Import (agregar al inicio, en orden alfabético):**
```javascript
import { [FEATURE]_CONFIG } from '@/features/[feature]/config/[feature].constants'
```

**Ruta en `ROUTES.ADMIN.CATALOGS`** (para catálogos) o en `ROUTES.ADMIN` (para módulos principales):

Para **catálogos** — agregar dentro de `ROUTES.ADMIN.CATALOGS`:
```javascript
[FEATURE_SLUG]: { 
  path: [FEATURE]_CONFIG.PATH, 
  permission: [FEATURE]_CONFIG.PERMISSIONS.READ,
  title: [FEATURE]_CONFIG.TITLE 
},
```

Para **módulos principales** — agregar dentro de `ROUTES.ADMIN`:
```javascript
[FEATURE_SLUG]: { 
  path: [FEATURE]_CONFIG.PATH, 
  permission: [FEATURE]_CONFIG.PERMISSIONS.READ,
  title: [FEATURE]_CONFIG.TITLE 
},
```

### 24. Actualizar `src/features/shared/lib/data/sidebar.js`

Agrega el item en la sección de navegación correspondiente.

Para **catálogos** — dentro del array `items` de `{ title: "Catálogos", ... }`:
```javascript
{
  title: ROUTES.ADMIN.CATALOGS.[FEATURE_SLUG].title,
  url: ROUTES.ADMIN.CATALOGS.[FEATURE_SLUG].path,
  permission: ROUTES.ADMIN.CATALOGS.[FEATURE_SLUG].permission,
},
```

Para **módulos principales** — dentro del array `items` de `{ title: "Configuración", ... }`:
```javascript
{
  title: ROUTES.ADMIN.[FEATURE_SLUG].title,
  url: ROUTES.ADMIN.[FEATURE_SLUG].path,
  permission: ROUTES.ADMIN.[FEATURE_SLUG].permission,
  icon: [IconComponent],
},
```

> **Iconos**: Usar componentes de `lucide-react`. Elegir uno adecuado (ej: `Tags` para catálogos, `Users` para usuarios, `FileText` para documentos, `CreditCard` para pagos).

### 25. `src/app/(root)/admin/catalogos/[ruta]/page.jsx`

Crea la página RSC (Server Component) siguiendo este patrón exacto:

```jsx
import { logger } from "@/features/shared/lib/logger";
import { Suspense } from "react";
import { [Feature]Table } from "@/features/[feature]/components/[Feature]Table";
import { [Feature]Provider } from "@/features/[feature]/components/[Feature]Provider";
import { TableSkeleton } from "@/components/shared/table/TableSkeleton";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { AccessDenied } from "@/components/shared/AccessDenied";
import { fetch[Feature]sList } from "@/features/[feature]/services/[feature].read.service";
import { checkPageAccess } from "@/features/auth/lib/auth-guard";
import { [FEATURE]_CONFIG } from "@/features/[feature]/config/[feature].constants";

const { LABELS } = [FEATURE]_CONFIG.UI;
export const metadata = {
  title: `${[FEATURE]_CONFIG.TITLE} | Sistema`,
};

export default async function [Feature]sPage({ searchParams }) {
  const { authorized } = await checkPageAccess([FEATURE]_CONFIG.PERMISSIONS.READ);

  if (!authorized) {
    return <AccessDenied />;
  }

  let data;
  try {
    const params = (await searchParams) || {};
    const page = params.page ? Number(params.page) : 1;
    const pageSize = params.pageSize ? Number(params.pageSize) : [FEATURE]_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE;
    const searchTerm = params.q || "";
    const sortKey = params.sortKey || "name";
    const sortDirection = params.sortDirection || "asc";

    data = await fetch[Feature]sList({
      page,
      pageSize,
      searchTerm,
      sortKey,
      sortDirection,
    });
  } catch (error) {
    logger.error("Error loading [feature]s:", error);
    return (
      <ErrorAlert 
        title="Error"
        message={LABELS.MESSAGES.ERROR.LOAD}
      />
    );
  }

  return (
    <[Feature]Provider items={data.items || []}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{[FEATURE]_CONFIG.TITLE}</h1>
          <p className="text-muted-foreground">
            {LABELS.DESCRIPTION}
          </p>
        </div>
        
        <Suspense fallback={<TableSkeleton />}>
          <[Feature]Table 
            data={data.items} 
            pagination={{ 
              page: data.page, 
              pageSize: data.pageSize, 
              totalPages: data.totalPages, 
              totalCount: data.totalCount 
            }}
          />
        </Suspense>
      </div>
    </[Feature]Provider>
  );
}
```

> **Reglas de la page**:
> - Es un **Server Component** (sin `"use client"`).
> - Verifica permisos con `checkPageAccess`.
> - Maneja errores con `ErrorAlert`.
> - Usa `Suspense` con `TableSkeleton` como fallback.
> - Envuelve la tabla en el `Provider` del feature.
> - Los `searchParams` se pasan a la tabla para URL-sync.

1. **Prisma solo en `repositories/`** — nunca importar `prisma` en actions, services, components, hooks, etc.
2. **Logger centralizado** — usar `logger.error()` en lugar de `console.error()`.
3. **Dialog inline en TableDialogs** — no crear archivo `FormDialog.jsx` separado.
4. **Toolbar compuesto** — usar el componente `<Toolbar>`, no HTML genérico.
5. **Doble estado en search** — `localSearchTerm` + URL sync con debounce 400ms.
6. **Constantes en inglés** — todas las variables, funciones y comentarios en inglés. Solo los labels de UI van en español.
7. **Sin `forwardRef`** — React 19 los refs son props normales.
8. **Sin `dangerouslySetInnerHTML`** — riesgo de XSS.
9. **Máx. 250 líneas por archivo** — si un archivo se acerca, refactorizar.
10. **Máx. 3 niveles de anidación**.
