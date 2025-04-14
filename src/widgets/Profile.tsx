'use client'

import { useCourseRead, useUserCoursesList } from "@/shared/api/generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { ShowFetchContent } from "@/shared/ui/show-fetch-content"
import { Skeleton } from "@/shared/ui/skeleton"
import { useTranslations } from "next-intl"

export const Profile = () => {
    const t = useTranslations('profile')
    const { data: userCourses, isLoading, error } = useUserCoursesList()
    return <section>
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
                    loader={<div></div>}

                />
                {userCourses?.map(c => <CourseItem key={c.id} id={c.course} />)}
            </CardContent>
        </Card>
    </section>
}

interface CourseItemProps {
    id?: number
}
const CourseItem = ({ id }: CourseItemProps) => {
    if (!id) return <Skeleton className="w-full rounded-lg h-[42px]" />;

    const { data: course } = useCourseRead(id)

    return <section className="px-3 py-2 border border-border rounded-lg">{course?.title_ru}</section>
}
