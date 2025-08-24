import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import useSession from "@/store/session";
import ThemeToggle from "../theme-switcher";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function UserMenu({ children }: { children: React.ReactNode }) {
  const { logout, email } = useSession();
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
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
