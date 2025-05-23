import { LearnContextProvider } from "@/shared/providers/learn.provider";
import { Separator } from "@/shared/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "@/shared/ui/sidebar";
import { LearnSidebar } from "@/widgets/LearnSidebar";
import { ArrowLeft, Library } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { ReactNode } from "react";


export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
    const { id } = await params
    return <LearnContextProvider courseId={id}>
        <SidebarProvider>

            <Left id={id} />
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

    </LearnContextProvider>

}

const Left = ({ id }: { id: number }) => {
    const t = useTranslations('lesson')
    return <Sidebar variant="inset" >
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild >
                        <Link href="/"> <ArrowLeft /> <Library /> <span>{t('all')}</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <LearnSidebar courseId={id} />
        </SidebarContent>
    </Sidebar>

}
