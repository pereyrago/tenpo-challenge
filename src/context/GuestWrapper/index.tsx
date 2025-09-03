"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PATHS from "@/constants/paths";
import { STORAGE_SESSION_KEY } from "@/lib/constants";

interface GuestWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const GuestWrapper: React.FC<GuestWrapperProps> = ({
  children,
  fallback = null,
}) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const sessionRaw = localStorage.getItem(STORAGE_SESSION_KEY);
      const session = sessionRaw ? JSON.parse(sessionRaw) : null;
      const token = session?.state?.token;
      if (token) {
        //validate token with sv
        router.replace(PATHS.LIST);
        return;
      }
    } catch {
      console.error("someti");
    }
    setChecking(false);
  }, [router]);

  if (checking) return fallback;
  return <>{children}</>;
};

export default GuestWrapper;
