import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import PATHS, {
  PROTECTED_PATHS,
  PUBLIC_PATHS,
  ProtectedPath,
  PublicPath,
} from "@/constants/paths";

const protectedRoutes = Object.values(PROTECTED_PATHS);
const publicRoutes = Object.values(PUBLIC_PATHS);

export default async function middleware(req: NextRequest) {
  console.log("Middleware running for:", req.nextUrl.pathname);
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes?.includes(path as ProtectedPath);
  const isPublicRoute = publicRoutes.includes(path as PublicPath);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL(PATHS.LOGIN, req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith(PATHS.LIST)
  ) {
    return NextResponse.redirect(new URL(PATHS.LIST, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
