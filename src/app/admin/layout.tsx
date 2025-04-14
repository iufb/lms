import { AppSidebar } from "@/shared/ui/app-sidebar";

import { Separator } from "@/shared/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/shared/ui/sidebar";
import { getCookie } from "cookies-next/server";
import { Fira_Sans } from 'next/font/google';
import { cookies } from "next/headers";
import { ReactNode } from "react";
import '../globals.css';


const fira = Fira_Sans({ subsets: ['latin', 'cyrillic'], weight: ["300", "400", "500", "600", "700", "800"] });

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const role = await getCookie('role', { cookies })
    console.log(role, 'ROLE')
    return <html lang="ru">
        <body className={fira.className}>
            <SidebarProvider>
                <AppSidebar role={`${role}`} />
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
