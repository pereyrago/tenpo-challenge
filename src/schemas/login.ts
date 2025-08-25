import * as z from "zod";
export const PASSWORD_ERROR_CASES = {
  length: "La contraseña debe tener al menos 8 caracteres",
  mayus: "La contraseña debe contener al menos una letra minúscula",
  minus: "La contraseña debe contener al menos una letra mayúscula",
  special: "La contraseña debe contener al menos un símbolo",
} as const;
export const loginSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  password: z
    .string()
    .min(8, PASSWORD_ERROR_CASES.length)
    .regex(/[a-z]/, PASSWORD_ERROR_CASES.minus)
    .regex(/[A-Z]/, PASSWORD_ERROR_CASES.mayus)
    .regex(/[^A-Za-z0-9]/, PASSWORD_ERROR_CASES.special),
});

export type LoginSchema = z.infer<typeof loginSchema>;
