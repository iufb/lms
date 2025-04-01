import { RegisterForm } from "@/features/RegisterForm";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
    parent: ResolvingMetadata
): Promise<Metadata> {

    const t = await getTranslations('registration')


    return {
        title: t('meta.title'),
        description: t('meta.description')
    }
}
export default function RegisterPage() {
    return <section className="container flex-center"><RegisterForm /></section>
}
