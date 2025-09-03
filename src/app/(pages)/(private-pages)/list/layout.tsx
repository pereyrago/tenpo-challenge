import type { Metadata } from "next";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import Aclaration from "@/components/business/aclaration";
import UserMenu from "@/components/business/userMenu";
import AuthWrapper from "@/context/AuthWrapper";

export const metadata: Metadata = {
  title: "Tekton / Tenpo Challenge",
  description:
    "Challenge técnico hecho por Gabriel Pereyra para Tekton Labs | Tenpo.",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container w-full min-h-screen flex justify-center items-center flex-col px-3 mx-auto">
      <AuthWrapper>
        <header className="w-5xl max-w-full flex items-center justify-between flex-row mx-auto pt-4 ">
          <nav className="flex items-center justify-between w-full">
            <Avatar>
              <AvatarImage src="/images/mini-logo.jpg" />
            </Avatar>
            <UserMenu />
          </nav>
        </header>
        <main className="h-full mt-2 mx-auto w-full max-w-5xl">{children}</main>
        <footer className="w-5xl max-w-full mx-auto flex justify-center pb-4">
          <Aclaration />
        </footer>
      </AuthWrapper>
    </div>
  );
}
