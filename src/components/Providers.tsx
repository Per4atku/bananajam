"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
};

export default Providers;
