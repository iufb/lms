import { Profile } from "@/widgets/Profile";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
): Promise<Metadata> {

    const t = await getTranslations('profile')
    return {
        title: t('meta.title'),
        description: t('meta.description')
    }
}
export default function DashboardPage() {
    return <Profile />
}
