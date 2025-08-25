import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeWrapper";

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>{children}</ThemeProvider>
    </html>
  );
}
