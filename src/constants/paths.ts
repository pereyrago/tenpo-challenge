export const PUBLIC_PATHS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/",
} as const;

export const PROTECTED_PATHS = {
  DASHBOARD: "/dashboard",
} as const;

export const API_PATHS = {
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  PERSONS: "/api/persons",
} as const;

export type ProtectedPath =
  typeof PROTECTED_PATHS[keyof typeof PROTECTED_PATHS];
export type PublicPath = typeof PUBLIC_PATHS[keyof typeof PUBLIC_PATHS];

const PATHS = { ...PUBLIC_PATHS, ...PROTECTED_PATHS };
export default PATHS;
