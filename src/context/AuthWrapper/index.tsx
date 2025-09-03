"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PATHS from "@/constants/paths";
import { STORAGE_SESSION_KEY } from "@/lib/constants";

interface AuthWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  fallback = null,
}) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const sessionRaw = localStorage.getItem(STORAGE_SESSION_KEY);
    let isAuthenticated = false;

    if (sessionRaw) {
      try {
        const session = JSON.parse(sessionRaw);
        isAuthenticated = !!session?.state?.token;
      } catch {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      router.replace(PATHS.LOGIN);
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) return fallback;

  return <>{children}</>;
};

export default AuthWrapper;
