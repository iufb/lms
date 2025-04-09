'use client'

import { Link } from "@/i18n/navigation";
import { CourseLessonsList200Item, useCourseLessonsList, useCourseRead } from "@/shared/api/generated";
import { cn, getLocalized } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { Skeleton } from "@/shared/ui/skeleton";
import { PauseCircle, PlayCircle } from "lucide-react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

interface LearnSidebarProps {
    courseId: number
}
export const LearnSidebar = ({ courseId }: LearnSidebarProps) => {
    return <section>
        <Top courseId={courseId} />
        <Separator className="my-2" />
        <Main courseId={courseId} />
    </section>
};

const Top = ({ courseId }: LearnSidebarProps) => {
    const locale = useLocale()
    const { data: course, isLoading, error } = useCourseRead(courseId)

    return <ShowFetchContent
        customError
        data={course}
        isLoading={isLoading}
        isError={error}
        error={<div>error</div>}
        loader={<Skeleton className="w-full h-8 " />}
        content={
            <h2 className="text-xl font-semibold  ">{course && getLocalized(course, 'title', locale)}</h2>}
    />

}
const container = "flex flex-col gap-4 pl-4 pt-3"
const Main = ({ courseId }: LearnSidebarProps) => {
    const { data, isLoading, error } = useCourseLessonsList({ course_id: courseId })

    return <ShowFetchContent
        data={data}
        isLoading={isLoading}
        isError={error}
        loader={<section className={cn(container)}>
            {Array.from({ length: 7 }).map((s, id) => <Skeleton key={id} className="w-full h-8" />)}
        </section>}
        error={<div>error</div>}
        content={<section className={cn(container, 'overflow-auto')}>
            {data?.map((l) => <LessonLink key={l.id} lesson={l} />)}

        </section>}

    />

}
interface LessonLinkProps {
    lesson: CourseLessonsList200Item
}

const LessonLink = ({ lesson }: LessonLinkProps) => {
    const searchParams = useSearchParams()
    const selected = searchParams.get('l')
    const active = selected && +selected == lesson.id

    return <Link key={lesson.id} href={`?l=${lesson.id}`} className={cn("px-3 py-2 bg-slate-100 rounded-lg hover:bg-slate-300 flex gap-1 items-center ", active && "border border-slate-300")}>
        {active ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
        <span className={cn("text-ellipsis line-clamp-1")}>{lesson.title_ru}</span>
    </Link>

}


