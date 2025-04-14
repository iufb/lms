'use client'
import { useRouter } from "@/i18n/navigation";
import { useUserCoursesPartialUpdate } from "@/shared/api/generated";
import { getLocalized } from "@/shared/lib/utils";
import { useLearn } from "@/shared/providers/learn.provider";
import { queryClient } from "@/shared/providers/query.provider";
import { Button } from "@/shared/ui/button";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { TestDialog } from "@/widgets/TestView";
import { Loader2 } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import ReactPlayer from 'react-player/lazy';
import { toast } from "sonner";
interface LearnViewProps {
    lessonOrder: number
}
export const LearnView = ({ lessonOrder }: LearnViewProps) => {
    const { lesson } = useLearn()
    const locale = useLocale()
    return <section className="stack">
        <ShowFetchContent
            data={lesson}
            isLoading={false}
            isError={null}
            loader={<section className="w-full h-52 flex-center"> <Loader2 size={48} className="animate-spin text-primary " /></section>}
            error={<div>no fetch errpr</div>}
            content={<section className="stack  gap-5 px-10">
                <div
                    className="px-3 w-full  text-black bg-white rounded-lg py-2"
                    dangerouslySetInnerHTML={{
                        __html: lesson && getLocalized(lesson, 'content', locale),
                    }}
                />
                {lesson &&
                    <div className="relative pt-[56.25%] dark:border dark:border-slate-500  ">
                        <ReactPlayer
                            url={getLocalized(lesson, 'media', locale)}
                            style={{ position: 'absolute', top: 0, left: 0 }}
                            width="100%"
                            height="100%"
                            controls
                        />
                    </div>}

                <section className="w-full flex items-center gap-2 mx-auto  ">
                    {lesson && <TestDialog id={lesson.id as number} mode="lesson" />}
                    <FinishLesson lastLesson={lesson?.order_num} />
                </section>

            </section>}

        />
    </section>
};

interface FinishLessonProps {
    lastLesson?: number,
}
const FinishLesson = ({ lastLesson }: FinishLessonProps) => {
    const t = useTranslations()
    const { progress: { next, current } } = useLearn()
    const { id } = useParams()
    const searchParams = useSearchParams()
    const userCourseId = searchParams.get('uc')

    const router = useRouter()
    const { mutate, isPending } = useUserCoursesPartialUpdate({
        mutation: {
            onSuccess: () => {
                toast.success(t('learningPage.success'))
                queryClient.invalidateQueries({ queryKey: [`/user-courses/`] })
                const newParams = new URLSearchParams(searchParams.toString())
                if (next)
                    newParams.set('l', next.toString())
                const href = next ? `?${newParams.toString()}` : `${id}/final`

                router.push(href)

            }, onError: (e) => {
                console.error(e)
                toast.error(t('learningPage.error'))
            }
        }
    })

    const finish = () => {
        if (userCourseId && lastLesson) {
            mutate({ data: { id: +userCourseId, last_lesson: next ? next : lastLesson } })
        }
    }

    return <Button onClick={finish} disabled={!userCourseId || isPending || !lastLesson} loading={isPending} variant={'outline'} className="w-1/2">{t('learningPage.endLesson')}</Button>

}
