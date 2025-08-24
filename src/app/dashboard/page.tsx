"use client";
import { useEffect } from "react";
import usePerson from "@/store/list";
import useSession from "@/store/session";
import * as React from "react";
import { CustomTable } from "@/components/table";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import UserMenu from "@/components/userMenu";

export default function DashboardPage() {
  const session = useSession();
  const { fetchPersons, persons } = usePerson();

  useEffect(() => {
    if (!persons || persons.length === 0) fetchPersons(1);
  }, []);

  return (
    <div className="container w-full h-full flex justify-center items-center flex-col p-2 pt-4 mx-auto">
      <div className="w-5xl max-w-full flex items-center justify-between flex-row">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="/images/mini-logo.jpg" alt="Tenpo logo" />
          </Avatar>
        </div>

        <UserMenu>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-orange-400 text-white">
              {session.email?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </UserMenu>
      </div>
      <CustomTable data={persons || []} pageSize={20} />
    </div>
  );
}
