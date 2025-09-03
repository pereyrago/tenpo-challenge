"use client";
import { useEffect } from "react";

import * as React from "react";
import { CustomTable } from "@/components/business/Table";
import useSession from "@/store/session";

export default function DashboardPage() {
  const { fetchPersons, persons } = useSession();

  useEffect(() => {
    if (!persons || persons.length === 0) fetchPersons(1);
  }, []);

  return <CustomTable data={persons || []} pageSize={20} />;
}
