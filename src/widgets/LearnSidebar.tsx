'use client'

import { Link } from "@/i18n/navigation";
import { CourseLessonsList200Item, useCourseRead } from "@/shared/api/generated";
import { cn, getLocalized } from "@/shared/lib/utils";
import { useLearn } from "@/shared/providers/learn.provider";
import { Separator } from "@/shared/ui/separator";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { Skeleton } from "@/shared/ui/skeleton";
import { CircleCheck, PauseCircle, PlayCircle } from "lucide-react";
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
            <h2 className="text-xl font-semibold truncate  ">{course && getLocalized(course, 'title', locale)}</h2>}
    />

}
const container = "flex flex-col gap-4 pl-4 pt-3"
const Main = ({ courseId }: LearnSidebarProps) => {
    const { lessons, isLessonsLoading, lessonsError } = useLearn()

    return <ShowFetchContent
        data={lessons}
        isLoading={isLessonsLoading}
        isError={lessonsError}
        loader={<section className={cn(container)}>
            {Array.from({ length: 7 }).map((s, id) => <Skeleton key={id} className="w-full h-8" />)}
        </section>}
        error={<div>error</div>}
        content={<section className={cn(container, 'overflow-auto')}>
            {/* @ts-ignore */}
            {lessons?.sort((a, b) => a.order_num - b.order_num).map((l) => <LessonLink key={l.id} lesson={l} />)}

        </section>}

    />

}
interface LessonLinkProps {
    lesson: CourseLessonsList200Item
}

const LessonLink = ({ lesson }: LessonLinkProps) => {
    const { progress: { current } } = useLearn()
    const searchParams = useSearchParams()
    const selected = searchParams.get('l')
    const active = selected && +selected == lesson.id

    const newParams = new URLSearchParams(searchParams.toString())
    if (lesson.order_num)
        newParams.set('l', lesson.order_num.toString())
    const href = `?${newParams.toString()}`

    //@ts-ignore
    const isDisabled = current ? current < lesson.order_num : false

    //@ts-ignore
    const isDone = current ? current >= lesson.order_num : false


    console.log(current, ' current')

    const Comp = isDisabled ? 'span' : Link

    return <Comp key={lesson.id} href={href} className={cn(
        "px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg flex gap-1 items-center",
        active && "border border-slate-300 dark:border-slate-600",
        isDone && "text-green-600",
        !isDisabled && "hover:bg-slate-300 dark:hover:bg-slate-700",
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none"
    )}>
        <div className="w-[14px]">{isDone ? <CircleCheck size={14} /> : active ? <PauseCircle size={14} /> : <PlayCircle size={14} />}</div>
        <span className={cn("overflow-hidden truncate ")}>{lesson.title_ru}</span>
    </Comp>

}


