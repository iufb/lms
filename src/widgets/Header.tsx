import { LocaleToggler } from "@/features/LocaleToggler"
import { ThemeToggler } from "@/features/ThemeToggler"
import { Link } from "@/i18n/navigation"
import { Button } from "@/shared/ui/button"
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
            <Button asChild>
                <Link href={'/dashboard'}><User /> {t('header.dashboard')}</Link>
            </Button>
        </section>
    </header>
}
