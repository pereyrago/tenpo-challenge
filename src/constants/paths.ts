export const PUBLIC_PATHS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/",
} as const;

export const PROTECTED_PATHS = {
  LIST: "/app/list",
} as const;

/* 
axios object already had /api prefix 
*/
export const API_PATHS = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  PERSONS: "/persons",
} as const;

export type ProtectedPath =
  typeof PROTECTED_PATHS[keyof typeof PROTECTED_PATHS];
export type PublicPath = typeof PUBLIC_PATHS[keyof typeof PUBLIC_PATHS];

const PATHS = { ...PUBLIC_PATHS, ...PROTECTED_PATHS };
export default PATHS;
