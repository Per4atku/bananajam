"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode, useState } from "react"
import { CookiesProvider } from "react-cookie"

const Providers = ({
  children,
  session,
}: {
  children: ReactNode
  session?: Session
}) => {
  const [queryClient] = useState(new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <SessionProvider session={session}>
          <CookiesProvider>{children}</CookiesProvider>
        </SessionProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}

export default Providers
