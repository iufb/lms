import { AppSidebar } from "@/shared/ui/app-sidebar";

import { Separator } from "@/shared/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/shared/ui/sidebar";
import { Manrope } from 'next/font/google';
import { ReactNode } from "react";
import '../globals.css';


const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ["300", "400", "500", "600", "700", "800"] });

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <html lang="ru">
        <body className={manrope.className}>
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
                    <div className="px-4 py-2">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>

        </body>
    </html>
}
