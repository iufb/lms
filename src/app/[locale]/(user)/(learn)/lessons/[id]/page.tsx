import { url } from "@/shared/api/custom-instance";
import { getLocalized } from "@/shared/lib/utils";
import { LearnView } from "@/widgets/LearnView";
import { getCookie } from "cookies-next/server";
import { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

interface Props {
    params: Promise<{ id: number }>
    searchParams: Promise<{ l?: number }>
}
const getCourse = async (id: number) => {
    const access = await getCookie('access', { cookies })
    return fetch(`${url}/course/${id}/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access}`
        }
    }).then(response => {
        if (!response.ok) {
        }
        return response.json();
    });
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata

): Promise<Metadata> {
    const locale = await getLocale()
    const { id } = await params
    const data = await getCourse(id)
    const title = getLocalized(data, 'title', locale)
    const description = getLocalized(data, 'description', locale)
    console.log(title, description)
    return {
        title,
        description
    }
}

export default async function Page({ searchParams }: Props) {
    const { l } = await searchParams
    const t = await getTranslations('learningPage')
    return l ? <LearnView lessonId={l} /> : <section className="max-w-3xl mx-auto">
        <h1>{t('title')}</h1>
        <p className="text-gray-400">{t('description')}</p>
    </section>
}
