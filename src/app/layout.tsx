import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/context/ThemeWrapper";

export const metadata: Metadata = {
  title: "Tekton / Tenpo Challenge",
  description:
    "Challenge técnico hecho por Gabriel Pereyra para Tekton Labs | Tenpo.",
  openGraph: {
    images: ["/images/og-img.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
