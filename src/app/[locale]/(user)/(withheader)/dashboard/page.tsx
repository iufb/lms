import { Profile } from "@/widgets/Profile";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
    parent: ResolvingMetadata
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
