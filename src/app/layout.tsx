import { QueryProvider } from "@/shared/providers/query.provider";
import { Toaster } from "@/shared/ui/sonner";
import { ReactNode } from "react";


export default function Layout({ children }: { children: ReactNode }) {
    return <QueryProvider>
        {children}
        <Toaster position="top-right" />
    </QueryProvider>
}
