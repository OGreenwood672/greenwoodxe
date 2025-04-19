import type { Metadata } from "next";
import "./globals.css";

import { NavBar } from "@/components/nav";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Oliver Greenwood",
  description: "Yours Truly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen px-8 py-1 overflow-hidden relative">
            <NavBar />
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
