import { CreateCourse } from "@/features/CreateCourse"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Админ-панель',
    description: 'Управление сайтом',
}
export default function Page() {
    return <section>
        <CreateCourse />
    </section>
};
