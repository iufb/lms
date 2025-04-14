'use client'

import { Link as IntlLink } from "@/i18n/navigation"
import { useCourseRead, UserCertificatesList200Item, useUserCertificatesList, useUserCoursesList } from "@/shared/api/generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { OrderNumber } from "@/shared/ui/order"
import { ShowFetchContent } from "@/shared/ui/show-fetch-content"
import { Skeleton } from "@/shared/ui/skeleton"
import { ClipboardList } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const Profile = () => {
    const t = useTranslations('profile')
    const { data: userCourses, isLoading, error } = useUserCoursesList()
    const { data: certs, isLoading: certLoading, error: certError } = useUserCertificatesList()
    return <section className="flex flex-col gap-10">
        <Card>
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('desc')}</CardDescription>
            </CardHeader>
            <CardContent>
                <ShowFetchContent
                    data={userCourses}
                    isLoading={isLoading}
                    isError={error}
                    loader={Array.from({ length: 3 }).map((_, id) => <Skeleton key={id} className="w-full h-[46px] my-2" />)}
                    error={<div>error</div>}
                    content={userCourses?.map((c, idx) => <CourseItem idx={idx + 1} key={c.id} id={c.course} certs={certs} />)}
                />

            </CardContent>
        </Card>

    </section>
}

interface CourseItemProps {
    idx: number,
    id?: number
    certs: UserCertificatesList200Item[] | undefined
}
const CourseItem = ({ id, idx, certs }: CourseItemProps) => {
    if (!id) return <Skeleton className="w-full rounded-lg h-[30px]" />;

    const { data: course, isLoading: courseLoading, error: courseError } = useCourseRead(id)
    const certId = certs ? certs.find(c => c.course == id)?.id : undefined

    return <section className="px-3 py-2 border border-border rounded-lg flex gap-2 items-center">
        {(courseLoading) ? <Skeleton className="w-[calc(100%-24px)] h-[30px]" /> : <IntlLink href={`/courses/${course?.id}`} className=""> <section className="" ><OrderNumber order={idx} /><span className="mt-1 ml-3">{course?.title_ru}</span></section></IntlLink>}
        {certId && <Link className="ml-auto" href={`/cert/${certId}`}><ClipboardList size={20} /></Link>}
    </section>
}
