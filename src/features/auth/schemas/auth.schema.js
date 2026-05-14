import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido.")
    .email("Ingresa un correo válido."),
  password: z
    .string()
    .min(1, "La contraseña es requerida.")
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export const sessionPayloadSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
});
