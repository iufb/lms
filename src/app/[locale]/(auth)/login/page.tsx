import { LoginForm } from "@/features/LoginForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
): Promise<Metadata> {

    const t = await getTranslations('login')


    return {
        title: t('meta.title'),
        description: t('meta.description')
    }
}
export default function LoginPage() {
    return <section className="container flex-center"><LoginForm /></section>
}
