'use client'
import { Link } from "@/i18n/navigation";
import { PurchaseCourseList200Item, usePurchaseCourseCreate, usePurchaseCourseList, UserCoursesList200Item, useUserCoursesList } from "@/shared/api/generated";
import { Button } from "@/shared/ui/button";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { Skeleton } from "@/shared/ui/skeleton";
import { QueryKey } from "@tanstack/react-query";
import { BookOpen, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface AccessCourseProps {
    courseId: number
}

const handleHasAccess = (items: UserCoursesList200Item[] | undefined, courseId: number): { hasAccess: boolean, lastLesson: number, userCourseId: number } => {
    if (!items) return { hasAccess: false, lastLesson: 0, userCourseId: 0 }
    const userCourses = items.filter(i => i.course == courseId)

    return { hasAccess: userCourses.length == 1, lastLesson: userCourses[0].last_lesson ?? 0, userCourseId: userCourses[0].id ?? 0 }
}

export const AccessCourse = ({ courseId }: AccessCourseProps) => {
    const { data, isLoading, error, queryKey } = useUserCoursesList()
    const { hasAccess, lastLesson, userCourseId } = handleHasAccess(data, courseId)
    return <ShowFetchContent
        data={data}
        isLoading={isLoading}
        customError
        isError={error}
        loader={<Skeleton className="w-[170px] h-[36px]" />}
        error={<BuyCourseButton queryKey={queryKey} courseId={courseId} />}
        content={<>
            {hasAccess ? <NavigateToCourseButton userCourseId={userCourseId} lastLesson={lastLesson} courseId={courseId} /> : <BuyCourseButton courseId={courseId} queryKey={queryKey} />}
        </>
        }
    />

};


const NavigateToCourseButton = ({ userCourseId, courseId, lastLesson }: { userCourseId: number, courseId: number, lastLesson: number }) => {

    const t = useTranslations('coursepage')
    const searchParams = useSearchParams()
    const router = useRouter()
    const query = lastLesson == 0 ? "" : `&l=${lastLesson}`
    useEffect(() => {
        const uc = searchParams.get('uc')
        if (!uc)
            router.replace(`?uc=${userCourseId}`)
    }, [userCourseId])

    return <Link className="trigger min-w-[170px]" href={`/lessons/${courseId}?uc=${userCourseId}${query}`}>
        <>
            <BookOpen /> {t('buttons.start')}</>
    </Link>
}

interface BuyCourseButtonProps {
    courseId: number,
    queryKey: QueryKey
}

function handleHasPurchase(items: PurchaseCourseList200Item[] | undefined, courseId: number): boolean {
    if (!items) return false
    const hasAccess = items.some(i => i.course_id == courseId)
    return hasAccess
}

const BuyCourseButton = ({ courseId, queryKey }: BuyCourseButtonProps) => {
    const t = useTranslations('accesscourse')
    const { data, isLoading, error } = usePurchaseCourseList()
    const { mutate: buy, isPending } = usePurchaseCourseCreate({
        mutation: {
            onSuccess: () => {
                toast.success(t('success'))

            },
            onError: (e) => {
                console.error(e)
                toast.error(t('error'))
            }
        }
    })

    const buyCourse = () => {
        buy({ data: { course_id: courseId } })
    }

    return <ShowFetchContent
        data={data}
        isLoading={isLoading}
        customError
        isError={error}
        loader={<Skeleton className="w-[170px] h-[36px]" />}
        error={<BuyCourseButton queryKey={queryKey} courseId={courseId} />}
        content={<>
            {handleHasPurchase(data, courseId) ? <span className="px-2 py-3 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 ">{t('pending')}</span> : <Button onClick={buyCourse} loading={isPending} disabled={isPending}>
                <>
                    <Wallet /> {t('buy')}</>
            </Button>}
        </>
        }
    />
}
