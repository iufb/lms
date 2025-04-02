"use client"

import {
    Book,
    Command,
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
import { getCookie } from "cookies-next"
import Link from "next/link"
import { usePathname } from "next/navigation"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const role = getCookie('role')
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
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
                <Links />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{ name: role as string, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }} />
            </SidebarFooter>
        </Sidebar>
    )
}

const Links = () => {
    const pathname = usePathname()
    return <ul className="flex flex-col gap-3 text-slate-800 text-lg ">
        <li className={cn('flex items-center pl-5 py-1.5  gap-2 ', pathname == '/admin' && 'bg-slate-200 rounded-lg')}>
            <Book size={18} />
            <Link href={'/admin'}>Курсы</Link>
        </li>
        <li className={cn('flex items-center pl-5 py-1.5  gap-2 ', pathname == '/admin/users' && 'bg-slate-200 rounded-lg')}>
            <User size={18} />
            <Link href={'/admin/users'}>Пользователи</Link>
        </li>
    </ul>

}
