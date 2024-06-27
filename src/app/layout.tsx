import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BananaJam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "relative h-full font-sans antialiased "
        )}
      >
        <main className="relative flex flex-col min-h-screen ">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
