import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { ReactQueryClientProvider } from "@/components/providers/react-query-provider";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/components/providers/wallet-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus",
  description: "AI Agent Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ReactQueryClientProvider>
          <WalletProvider>
            <body className={`${inter.className} bg-[#111827]`}>
              {children}
              <Toaster />
            </body>
          </WalletProvider>
        </ReactQueryClientProvider>
      </ThemeProvider>
    </html>
  );
}
