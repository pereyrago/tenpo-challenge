"use client";
import { useEffect } from "react";
import usePerson from "@/store/list";
import * as React from "react";
import { CustomTable } from "@/components/table";

export default function DashboardPage() {
  const { fetchPersons, persons } = usePerson();

  useEffect(() => {
    if (!persons || persons.length === 0) fetchPersons(1);
    const savedTheme = localStorage.getItem("data-theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark" ||
          (savedTheme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
  }, []);

  return <CustomTable data={persons || []} pageSize={20} />;
}
