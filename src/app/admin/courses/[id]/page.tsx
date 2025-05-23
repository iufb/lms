import { CreateFinalTest } from "@/features/CreateFinalTest"
import { CreateLesson } from "@/features/CreateLesson"
import { LessonsList } from "@/widgets/LessonsList"
import { Metadata } from "next"

interface Props {
    params: Promise<{ id: number }>
}
export async function generateMetadata(
    { params, }: Props,
): Promise<Metadata> {
    const { id } = await params


    return {
        title: `Редактирование курса №${id}`,
        description: ""
    }
}
export default async function CoursePage({ params }: Props) {
    const { id } = await params
    return <div className="flex gap-2 flex-col">
        <CreateLesson id={id} />

        <LessonsList courseId={id} mode="admin" />
        <CreateFinalTest courseId={id} />

    </div>
}
