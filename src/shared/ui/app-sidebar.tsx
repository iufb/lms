"use client"

import {
    Book,
    BookOpen,
    Inbox,
    User
} from "lucide-react"
import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { NavUser } from "@/shared/ui/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"



export function AppSidebar({ role, ...props }: React.ComponentProps<typeof Sidebar> & { role: string }) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <BookOpen className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">LMS платформа</span>
                                    <span className="truncate text-xs"></span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <Links role={role} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{ name: role as string, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }} />
            </SidebarFooter>
        </Sidebar>
    )
}

const Links = ({ role }: { role: string }) => {
    const pathname = usePathname()
    return <ul className="flex flex-col gap-3 text-slate-800 text-lg">
        {role == 'admin' && <li className={cn('flex items-center pl-5 py-1.5  gap-2 ', pathname == '/admin' && 'bg-slate-200 rounded-lg')}>
            <Book size={18} />
            <Link className="w-full" href={'/admin'}>Курсы</Link>
        </li>}
        <li className={cn(' flex items-center pl-5 py-1.5  gap-2 ', pathname == '/admin/users' && 'bg-slate-200 rounded-lg')}>
            <User size={18} />
            <Link className="w-full" href={'/admin/users'}>Пользователи</Link>
        </li>
        {role == 'admin' && <li className={cn('flex items-center pl-5 py-1.5  gap-2 ', pathname == '/admin/requests' && 'bg-slate-200 rounded-lg')}>
            <Inbox size={18} />
            <Link className="w-full" href={'/admin/requests'}>Запросы на доступ</Link>
        </li>}

    </ul>

}
