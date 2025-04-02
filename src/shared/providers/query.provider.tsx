'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1
        }
    }
})
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(() => queryClient);

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
}

