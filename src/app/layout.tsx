import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";
import { TRPCProvider } from "./_trpc/Provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: { default: "Kanban board", template: "%s | Kanban board" },
  description: "Kanban board app",
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
