import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[^A-Za-z0-9]/, "La contraseña debe contener al menos un símbolo"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
