import { z } from "zod";
import { UI } from "@/features/auth/config/auth.constants";

const LABELS = UI.LABELS.FORM;

/**
 * Form field definitions for user create/edit form.
 * Each field has: name, label, placeholder, type, required, component.
 */
export const USER_FORM_FIELDS = [
  {
    name: "firstName",
    label: LABELS.FIRST_NAME,
    placeholder: LABELS.FIRST_NAME_PLACEHOLDER,
    type: "text",
    required: true,
    component: "input",
  },
  {
    name: "lastName",
    label: LABELS.LAST_NAME,
    placeholder: LABELS.LAST_NAME_PLACEHOLDER,
    type: "text",
    required: true,
    component: "input",
  },
  {
    name: "email",
    label: LABELS.EMAIL,
    placeholder: LABELS.EMAIL_PLACEHOLDER,
    type: "email",
    required: true,
    component: "input",
  },
  {
    name: "idNumber",
    label: LABELS.ID_NUMBER,
    placeholder: LABELS.ID_NUMBER_PLACEHOLDER,
    type: "text",
    required: true,
    component: "input",
  },
  {
    name: "roleId",
    label: LABELS.ROLE,
    placeholder: LABELS.ROLE_PLACEHOLDER,
    type: "select",
    required: true,
    component: "select",
  },
  {
    name: "areaId",
    label: LABELS.AREA,
    placeholder: LABELS.AREA_PLACEHOLDER,
    type: "select",
    required: false,
    component: "select",
  },
];

/**
 * Zod schema for creating/editing a user.
 */
export const userFormSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido."),
  lastName: z.string().min(1, "El apellido es requerido."),
  email: z.string().min(1, "El correo es requerido.").email("Ingresa un correo válido."),
  idNumber: z.string().min(1, "La cédula es requerida."),
  roleId: z.number({ required_error: "El rol es requerido." }),
  areaId: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});
