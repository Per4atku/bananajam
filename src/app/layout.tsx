import Providers from "@/components/Providers"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Toaster } from "sonner"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BananaJam",
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "relative h-full font-sans antialiased ",
        )}
      >
        <Providers>
          <main className="relative flex flex-col min-h-screen bg-slate-900 ">
            <Toaster />
            <div className="flex-grow flex-1 ">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
