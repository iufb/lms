"use client"

import { usePathname } from "@/i18n/navigation"
import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"


export function LocaleToggler() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const changeLocale = (newLocale: string) => {
        router.replace(`/${newLocale}${pathname}`)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {locale == 'ru' ? 'ru' : 'kz'}
                    <span className="sr-only">Toggle locale</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLocale("ru")}>
                    RU
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLocale("kz")}>
                    KZ
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
