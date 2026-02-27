import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zustore",
  description: "Tienda online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter} antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
