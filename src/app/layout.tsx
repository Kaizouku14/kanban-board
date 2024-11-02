import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import { TRPCProvider } from "./_trpc/Provider";
import { Toaster } from "sonner";
import Header from "@/components/Header/header";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <TRPCProvider>
            <Header/>
            {children}
          </TRPCProvider>
          <Toaster
              position="top-center"
              toastOptions={{
                classNames: {
                  warning: "bg-yellow-500 text-white",
                  error: "bg-red-500 text-white",
                  info: "bg-seagull-500 text-white",
                  success: "bg-green-500 text-white",
                },
              }}
            />
        </ThemeProvider>
      </body>
    </html>
  );
}
