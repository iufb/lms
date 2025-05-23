'use client'
import { CourseLessonsList200Item, useCourseLessonsList } from "@/shared/api/generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Error } from "@/shared/ui/error"
import { OrderNumber } from "@/shared/ui/order"
import { Separator } from "@/shared/ui/separator"
import { ShowFetchContent } from "@/shared/ui/show-fetch-content"
import { Skeleton } from "@/shared/ui/skeleton"
import { useLocale } from "next-intl"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React from 'react'

interface LessonsListProps {
    courseId: number
    mode: 'admin' | 'user'
    t?: any
}

export const LessonsList = ({ mode, courseId, t }: LessonsListProps) => {
    const searchParams = useSearchParams()
    const { data, isLoading, error, queryKey } = useCourseLessonsList({ course_id: courseId })
    const locale = mode == 'user' && useLocale()
    return <ShowFetchContent<CourseLessonsList200Item>
        data={data}
        isError={error}
        isLoading={isLoading}
        loader={Array.from({ length: 5 }).map((_, id) => <Skeleton key={id} className="w-full rounded-lg h-10 my-2" />)}
        error={<Error>{t ? t('error') : "Ошибка загрузки"}</Error>}
        content={<Card>
            <CardHeader>
                <CardTitle>{t ? t('title') : "Уроки"}</CardTitle>
                <CardDescription>{t ? t('desc') : "Список уроков"}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                {/* @ts-ignore */}
                {data?.sort((a, b) => a?.order_num - b?.order_num).map(l =>
                    <React.Fragment key={l.id}>
                        <Link href={mode == 'admin' ? `${courseId}/lesson/${l.id}` : `/${locale}/lessons/${courseId}?uc=${searchParams.get('uc')}&l=${l.order_num}`} className="px-3 py-2 flex items-center gap-2 truncate " >
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

