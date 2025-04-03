import { EditLessonForm } from "@/features/EditLessonForm"
import { Metadata, ResolvingMetadata } from "next"

interface Props {
    params: Promise<{ id: number, lesson: number }>
}
export async function generateMetadata(
    { params, }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id, lesson } = await params

    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `Редактирование курса №${id} , урок № ${lesson}`,
        description: ""
    }
}
export default async function CoursePage({ params }: Props) {
    const { id, lesson } = await params
    return <div className="">
        <EditLessonForm lessonId={lesson} />

    </div>
}
