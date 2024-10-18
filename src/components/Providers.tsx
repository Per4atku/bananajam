"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { Session } from "next-auth"
import { ReactNode, useState } from "react"
import { CookiesProvider } from "react-cookie"

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <CookiesProvider>{children}</CookiesProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}

export default Providers
