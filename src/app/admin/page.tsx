import { CreateCourse } from "@/features/CreateCourse"
import { CoursesList } from "@/widgets/CoursesList"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Админ-панель',
    description: 'Управление сайтом',
}
export default function Page() {
    return <section className="flex flex-col gap-2">
        <CreateCourse />
        <CoursesList />
    </section>
};
