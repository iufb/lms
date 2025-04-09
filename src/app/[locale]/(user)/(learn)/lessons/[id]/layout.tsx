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

import { ReactNode } from "react";


export default async function Layout({ children, params }: { children: ReactNode, params: any }) {
    const { id } = await params
    console.log(await params)
    return <SidebarProvider>
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

}

const Left = ({ id }: { id: number }) => {
    const t = useTranslations('lesson')
    return <Sidebar variant="inset" >
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild >
                        <a href="/"> <ArrowLeft /> <Library /> <span>{t('all')}</span></a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <LearnSidebar courseId={id} />
        </SidebarContent>
    </Sidebar>

}
