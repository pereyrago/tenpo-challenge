import { api } from "./api";

export type LoginResponse = {
  token: string;
  role: "admin" | "user";
  email: string;
};

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  // en el challenge podés devolver un token fake con un delay simulado
  const response = await api.post<LoginResponse>("/login", {
    email,
    password,
  });

  return response.data;
}
