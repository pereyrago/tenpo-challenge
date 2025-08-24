"use client";
import { useEffect } from "react";
import usePerson from "@/store/list";
import useSession from "@/store/session";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import * as React from "react";
import { CustomTable } from "@/components/table";
import Image from "next/image";
import ThemeToggle from "@/components/theme-switcher";

export default function DashboardPage() {
  const session = useSession();
  const { logout } = session;
  const { fetchPersons, persons } = usePerson();

  useEffect(() => {
    if (!persons || persons.length === 0) fetchPersons(1);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col pt-4">
      <div className="w-5xl flex items-center justify-between flex-row">
        <div className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Tenpo Logo"
            width={137}
            height={46}
            className="mx-auto mb-4"
          />
        </div>
        <ThemeToggle />
        <Button size={"sm"} variant={"outline"} onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </Button>
      </div>
      <CustomTable data={persons || []} pageSize={20} />
    </div>
  );
}
