export type Role = "guest" | "user" | "admin";
export interface SessionPayload {
  userId: number;
  email: string;
  token: string;
  role: Role;
}
