import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BananaJam",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "relative h-full font-sans antialiased "
        )}
      >
        <Providers>
          <main className="relative flex flex-col min-h-screen background-gradient ">
            <Toaster />

            <div className="flex-grow flex-1 ">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
