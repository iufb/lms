import { AppSidebar } from "@/shared/ui/app-sidebar";
import { Separator } from "@/shared/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/shared/ui/sidebar";
import { ReactNode } from "react";


import '../globals.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <html lang="ru">
        <body>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                        </div>
                    </header>
                    <div className="p-2">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>

        </body>
    </html>
}
