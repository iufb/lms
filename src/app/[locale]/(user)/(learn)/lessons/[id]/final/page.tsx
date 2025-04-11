import { Link } from "@/i18n/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { TestView } from "@/widgets/TestView"
import { ArrowLeftIcon } from "lucide-react"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

interface Props {
    params: Promise<{ id: number }>

}
export async function generateMetadata(
): Promise<Metadata> {
    const t = await getTranslations('finaltest')

    return {
        title: t('title'),
        description: t('desc')
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params
    const t = await getTranslations('finaltest')

    return <section className="max-w-4xl mx-auto py-10 px-2 md:px-0 flex flex-col gap-5 min-h-screen">
        <Link href={`/courses/${id}`} className="border border-slate-300 flex w-fit items-center gap-2 px-4 py-2 rounded-lg  ">
            <ArrowLeftIcon size={18} />
            {t('tocourse')}</Link>

        <Card >
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('desc')}</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto">
                <TestView mode="final" id={id} />
            </CardContent>
        </Card>
    </section>
}
