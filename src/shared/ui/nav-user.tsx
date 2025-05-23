"use client"

import {
    ChevronsUpDown,
    LogOut
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/shared/ui/sidebar"
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"
const userLabel = {
    admin: "Админ",
    ses: "Сотрудник CЭС"
}
export function NavUser({
    user,
}: {
    user: {
        name: string
        avatar: string
    }
}) {
    const { isMobile } = useSidebar()
    const router = useRouter()
    const logout = () => {
        deleteCookie('access')
        deleteCookie('refresh')
        deleteCookie('role')
        router.push('/ru/login')
    }


    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{userLabel[user.name as keyof typeof userLabel]}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{userLabel[user.name as keyof typeof userLabel]}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={logout}>
                            <LogOut />
                            Выйти
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
