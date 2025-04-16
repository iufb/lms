import { CreateTest } from "@/features/CreateTest"
import { EditLessonForm } from "@/features/EditLessonForm"
import { Metadata } from "next"

interface Props {
    params: Promise<{ id: number, lesson: number }>
}
export async function generateMetadata(
    { params, }: Props,
): Promise<Metadata> {
    const { id, lesson } = await params


    return {
        title: `Редактирование курса №${id} , урок № ${lesson}`,
        description: ""
    }
}
export default async function CoursePage({ params }: Props) {
    const { id, lesson } = await params
    return <div className="flex flex-col gap-3 overflow-auto">
        <EditLessonForm lessonId={lesson} />
        <CreateTest lessonId={lesson} />

    </div>
}
