import PATHS from "@/constants/paths";
import { api } from "./api";
import { Role } from "@/schemas/session";
import { AxiosError } from "axios";

export type LoginResponse = {
  token: string;
  role: Role;
  email: string;
};

export class LoginError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "LoginError";
    this.status = status;
  }
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>(PATHS.LOGIN, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        "Error al iniciar sesión. Verifica tus credenciales.";
      throw new LoginError(message, status);
    } else {
      throw new LoginError("Ocurrió un error inesperado.");
    }
  }
}
