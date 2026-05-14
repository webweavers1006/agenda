# Reglas del Proyecto — Agenda

> **Agent Profile:** Senior Full-Stack Developer.
> **Environment:** Windows 11 + WSL2 (Ubuntu). Node.js con `TZ=UTC`.
> **Stack:** Next.js 16.2 (App Router), React 19, Tailwind 4, Prisma 7.5, PostgreSQL, JWT (jose), bcryptjs.

---

## 1. 🛠️ Stack Specifications

### Next.js 16.2 & React 19

- Usar **Server Components por defecto**.
- Implementar `"use cache"` en `services/` para optimizar data fetching.
- En React 19, los `refs` son props normales. **Prohibido**: usar `forwardRef`.
- **Prohibido**: renderizar fechas dinámicas directamente en el cliente. Usar estrategias de supresión o formateo del lado del servidor para evitar *Hydration Mismatch*.

### Tailwind CSS v4

- **Prohibido**: usar `tailwind.config.js`. Toda la customización del tema va en CSS global vía `@theme`.

### Prisma

- Uso exclusivo en la capa `repositories/`. Prohibido en componentes, actions, services o app.
- Usar el Driver Adapter `@prisma/adapter-pg` para estabilidad en WSL.
- Después de cualquier cambio en el schema, ejecutar `pnpm exec prisma generate`.
- Usar `pnpm exec prisma migrate dev --name <description>` para migraciones en desarrollo.
- Usar `pnpm exec prisma migrate reset --force` solo en desarrollo.
- **No ejecutar** `pnpm audit fix --force`: rompe Next.js y Prisma.

### Package Manager

- Usar **pnpm** exclusivamente. **Prohibido**: npm o yarn.

### UI

- Íconos: `lucide-react`.
- Notificaciones toast: `sonner`.
- Puerto: **3000**.

---

## 2. 🎯 Code Paradigms

### Límite estricto de líneas

- Máximo **250 líneas por archivo**. Si se excede, refactorizar inmediatamente.
- *Excepción*: Código de librería (Shadcn UI en `src/components/ui/`) no tiene límite.

### Lenguaje

- Solo **JS/JSX**. TypeScript está prohibido a menos que se solicite explícitamente.

### Estructura modular por Feature

#### `src/app/`
- Solo archivos de ruteo. **Prohibido**: lógica de negocio o UI compleja aquí.
- Solo verifica permisos y hace el fetch inicial (RSC).

#### `src/features/[feature]/`
- Único lugar para lógica de dominio. Contiene: `components/`, `hooks/`, `actions/`, `services/`, `repositories/`, `mappers/`, `schemas/`, `config/`.

#### `src/components/`
- `ui/` (átomos shadcn) y `shared/` (infraestructura/layout).

### Elementos Globales & Providers

- **Providers técnicos/UI** (ej. `ThemeProvider`): obligatorio en `src/components/shared/providers/`.
- **Providers de lógica** (ej. `PermissionsProvider`): son componentes de dominio, pertenecen a su feature respectiva (ej. `features/auth/components/`).
- **Config global**: rutas, hooks y lógica transversal en `src/features/shared/`.

---

## 3. 🧱 Architecture Layers (A-S-R-M)

### Actions (`actions/`)
- Orquestación de Next.js.
- Manejan validación **Zod**, revalidación de caché (`revalidatePath`) y gestión de sesión.
- Llaman **exclusivamente** a `services`.

### Services (`services/`)
- Lógica de dominio y negocio.
- Orquestan llamadas a uno o más `repositories`.
- **Prohibido**: usar API client o conocer URLs aquí.

### Repositories (`repositories/`)
- Acceso a datos.
- **Único lugar** donde se hacen queries de Prisma (read, write, update, delete).
- Llaman **exclusivamente** a `mappers`.
- Gracias a Prisma `@map` / `@@map`, todos los nombres de campos aquí son en **inglés**.

### Mappers (`mappers/`)
- Capa de transformación de datos **obligatoria**.
- Con `@map` / `@@map` en el schema, el rol del mapper es **normalización de formas** y **aplanamiento de relaciones** (NO traducción de nombres de campo, Prisma ya lo maneja).
- **Método obligatorio `toSortKey(domainKey)`**: centraliza la traducción de claves de ordenamiento del dominio a campos de Prisma para cláusulas `orderBy`. Pertenece al mapper, no inline en el repository.
- **Método obligatorio `toPersistence(domain)`**: traduce un DTO de dominio a un payload de escritura de Prisma.
- Métodos obligatorios: `toDomain(entity)`, `toDomainList(entities)`, `toPersistence(domain)`, `toSortKey(domainKey)`.

### Validation Service (`[feature].validation.service.js`)
- **Obligatorio** para validaciones de reglas de negocio.
- Contiene solo funciones que verifican reglas de dominio (ej. unicidad de un campo, disponibilidad, requisitos complejos entre entidades).
- **No** realiza validación estructural (eso es trabajo de Zod en `actions/`).
- Usado exclusivamente por servicios `write` antes de realizar mutaciones.

### Segregación Read/Write (CQRS)
- Para mantener el límite de 250 líneas, separar archivos por intención:
  - `[feature].read.[layer].js` (ej. `staff.read.repository.js`)
  - `[feature].write.[layer].js` (ej. `staff.write.repository.js`)

### Convención de nombres (Inglés)
- Nombres de archivos, carpetas, variables, funciones y constantes en **INGLÉS**.
- Archivos de lógica: `[entity].[layer].js` (ej. `staff.mapper.js`, `client.read.service.js`).
- **Obligatorio**: `[feature].constants.js` para centralizar TODOS los labels de UI, mensajes de error y configuración específica del feature.
- Componentes UI en **PascalCase** (ej. `StaffManagement.jsx`, `UsersDashboard.jsx`).
- Sufijo `List` obligatorio (ej. `fetchStaffList`, `getStaffListAction`).

---

## 4. 🧱 Database

### Queries seguras
- **Prohibido**: usar strings concatenadas en queries. Solo se permite la API tipada de Prisma.
- Sin raw SQL strings. Usar `$queryRaw` con bind parameters solo cuando sea necesario.

### Prisma Schema: Puente Inglés/Español vía `@map` / `@@map`
- **Obligatorio para modelos nuevos**: Todos los modelos y campos de Prisma deben definirse en **inglés** en el schema.
- Usar `@map("nombre_columna")` para mapear campos en inglés a nombres de columna en español en la DB.
- Usar `@@map("nombre_tabla")` para mapear modelos en inglés a nombres de tabla en español en la DB.
- Esto permite que repositories, mappers y services usen **100% inglés** mientras PostgreSQL conserva sus nombres originales en español.
- **No se requiere migración** al agregar `@map` — es solo un alias del cliente de Prisma. Ejecutar `pnpm exec prisma generate` después de cambios.
- **Modelos existentes** (ej. `tipo_actividad`, `prioridad`, `planificacion`): migrar progresivamente a la convención inglés + `@map`/`@@map` cuando se toquen para nuevas features.

### Ejemplo (modelo nuevo)
```prisma
model ActivityType {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name      String   @unique @map("nombre") @db.VarChar(100)
  slug      String   @unique @db.VarChar(100)
  sortOrder Int      @default(0) @map("orden")
  isActive  Boolean  @default(true) @map("activo")
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)

  @@map("tipo_actividad")
}
```

### Convención de Timestamps
- Todo modelo **debe** incluir:
  - `createdAt DateTime? @default(now()) @map("created_at")`
  - `updatedAt DateTime? @updatedAt @map("updated_at")`

### Seed (`prisma/seed.js`)
- Debe usar nombres de modelos y campos en inglés (ej. `prisma.user`, `{ firstName: "..." }`).
- Debe ser **idempotente** usando `upsert`.

---

## 5. 🖼️ UI Conventions

### Componentes & Hooks

- Los hooks deben usar **hyphen-case** (ej. `use-staff-management.js`, `use-client-form.js`).
- Los componentes deben delegar su lógica a hooks de gestión custom.
- **Obligatorio**: extraer lógica de `useForm`, schemas y transformación de opciones en hooks específicos.

### UI Config-Driven (Obligatorio)

- **Prohibido**: strings hardcodeados (texto en español) directamente en componentes.
- **Obligatorio**: Todos los labels, placeholders, tooltips y mensajes de alerta deben residir en `src/features/[feature]/config/[feature].constants.js`.
- Estructura estándar de constantes:
  - `ERRORS`: Mensajes de error consistentes.
  - `UI.LABELS.FORM`: Campos, placeholders, descripciones y botones de acción.
  - `UI.LABELS.TABLE`: Encabezados de columna, mensajes de estado vacío y nombres de entidades.
  - `UI.LABELS.TOOLBAR`: Placeholders de búsqueda, labels de filtros y botones.
  - `UI.LABELS.DELETE_DIALOG`: Títulos y descripciones para alertas de confirmación.

### Formularios
- Stack: `react-hook-form` + `zod` + `[feature].form.config.js`.
- Siempre consumir labels del archivo de constantes centralizado.
- `form.config.js`: Define el esquema del formulario (name, label, placeholder, component).

### Tablas
- Definiciones de columna en `[feature].columns.jsx`.
- Usar `createActionsColumn` + `DataTable` genérico.
- Consumir encabezados de columna de los labels `TABLE` en constantes.

### Toolbar
- **Obligatorio**: Usar el componente compuesto `<Toolbar>` de `@/components/shared/Toolbar`.
- **Prohibido**: HTML genérico (`div`, `Input`, etc.) directamente para construir el toolbar.

### API Configuration
- `API_BASE_URL` reside exclusivamente en `src/features/shared/config/api.config.js`.

---

## 6. 🛡️ Security & Authentication

### Sesión (Jose)
- Almacenada en cookies **HTTP-only**.
- **Payload**: `id, name, email, role`.
- **Expiración obligatoria**: **8 horas**.

### Autenticación
- Password hashing con **bcryptjs** (12 rounds de salt).
- Login vía Server Actions con validación Zod.
- Verificación de sesión/rol solo en RSC, Server Actions y `middleware.js`.

### Validación (Zod)
- **Obligatoria** en cada entrada de datos.

### File Uploads
- Máximo **5MB**.
- Validación obligatoria de **Magic Bytes** (contenido real, no solo extensión).

### Logging
- **Prohibido**: loguear PII (cédulas completas, JWT, Cookies). Solo IDs o hashes.

---

## 7. 🧪 Quality & Diagnostics

### Complejidad
- Máximo **3 niveles de anidación** (`if`/`for`/`try`).

### XSS
- **Prohibido**: `dangerouslySetInnerHTML`.

### CSRF
- Las mutaciones fuera de Server Actions requieren un token CSRF verificado.

---

## 8. 📝 Communication

### Código
- Nombres de variables, funciones y **comentarios en INGLÉS**.

### Interacción
- Explicaciones y respuestas al usuario en **ESPAÑOL**.
