'use client'
import { LocaleToggler } from "@/features/LocaleToggler"
import { ThemeToggler } from "@/features/ThemeToggler"
import { Link, useRouter } from "@/i18n/navigation"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/shared/ui/menubar"
import { deleteCookie } from "cookies-next/client"
import { User } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

export const Header = () => {
    const t = useTranslations()
    return <header className="max-w-5xl mx-auto py-3 px-4 flex justify-between items-center">
        <Link href={'/'}>
            <Image src={'/logo.svg'} width={64} height={64} alt="Logo" />
        </Link>
        <section className="flex gap-2">
            <ThemeToggler />
            <LocaleToggler />
            <Profile />
        </section>
    </header>
}

const Profile = () => {
    const t = useTranslations('header')
    const router = useRouter()
    const logout = () => {
        deleteCookie('access')
        deleteCookie('refresh')
        router.push('/login')
    }

    return <Menubar>
        <MenubarMenu>
            <MenubarTrigger className="flex gap-2 h-[36px] "><User size={14} />{t('dashboard.btn')}</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    <Link href={'/dashboard'}>
                        {t('dashboard.profile')}</Link></MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={logout}>{t('dashboard.logout')}</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
}
