'use client'
import { CourseLessonsList200Item, useCourseLessonsList } from "@/shared/api/generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Separator } from "@/shared/ui/separator"
import { ShowFetchContent } from "@/shared/ui/show-fetch-content"
import { Skeleton } from "@/shared/ui/skeleton"
import Link from "next/link"
import React from 'react'
interface LessonsListProps {
    courseId: number
}
export const LessonsList = ({ courseId }: LessonsListProps) => {
    const { data, isLoading, error, queryKey } = useCourseLessonsList({ course_id: courseId })
    console.log(queryKey)
    return <ShowFetchContent<CourseLessonsList200Item>
        data={data}
        isError={error}
        isLoading={isLoading}
        loader={Array.from({ length: 5 }).map((_, id) => <Skeleton key={id} className="w-full rounded-lg h-10" />)}
        error={<div>error</div>}
        content={<Card>
            <CardHeader>
                <CardTitle>Уроки</CardTitle>
                <CardDescription>Список уроков для этого курса</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                {data?.map(l =>
                    <React.Fragment key={l.id}>
                        <Link href={`${courseId}/lesson/${l.id}`} className="px-3 py-2 flex items-center gap-2 " >
                            <OrderNumber order={l.order_num} />
                            <span className="mt-1">
                                {l.title_ru}
                            </span>

                        </Link>
                        <Separator className="my-3" />
                    </React.Fragment>
                )}
            </CardContent>
        </Card>
        }
    />
}
const OrderNumber = ({ order }: { order?: number }) => {
    return <div className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border"><span className="text-xs">{order}</span></div>

}


