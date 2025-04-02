import { CreateLesson } from "@/features/CreateLesson"
import { Metadata, ResolvingMetadata } from "next"

interface Props {
    params: Promise<{ id: number }>
}
export async function generateMetadata(
    { params, }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params

    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `Редактирование курса №${id}`,
        description: ""
    }
}
export default async function CoursePage({ params }: Props) {
    const { id } = await params
    return <div className="">
        <CreateLesson />
    </div>
}
