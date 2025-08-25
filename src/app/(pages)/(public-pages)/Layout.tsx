import type { Metadata } from "next";

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
    <body>
      <main>{children}</main>
    </body>
  );
}
