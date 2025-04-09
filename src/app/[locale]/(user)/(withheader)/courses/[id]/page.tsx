import { url } from "@/shared/api/custom-instance"
import { getLocalized } from "@/shared/lib/utils"
import { CourseView } from "@/widgets/CourseView"
import { getCookie } from "cookies-next/server"
import { Metadata, ResolvingMetadata } from "next"
import { getLocale } from "next-intl/server"
import { cookies } from "next/headers"
type Props = {
    params: Promise<{ id: number }>
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


export default async function Page({ params }: Props) {
    const { id } = await params
    return <CourseView id={id} />
}


