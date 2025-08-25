"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSession from "@/store/session";
import { Separator } from "@radix-ui/react-dropdown-menu";
import ThemeToggle from "../Theme-switcher";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function UserMenu() {
  const { logout, email } = useSession();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-orange-400 text-white">
            {email?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="end">
        <>
          <h3>{email}</h3>
          <Separator className="my-2" />
          <ThemeToggle />
          <Separator className="my-4" />
          <Button variant={"outline"} className="w-full" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
          </Button>
        </>
      </PopoverContent>
    </Popover>
  );
}
