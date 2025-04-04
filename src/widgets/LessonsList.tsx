'use client'
import { CourseLessonsList200Item, Lesson, useCourseLessonsList } from "@/shared/api/generated"
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
    const { data, isLoading, error } = useCourseLessonsList({ course_id: courseId })
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

const mockLessons: Lesson[] = [
    {
        id: 1,
        title_ru: "Математика",
        title_kz: "Математика",
        content_ru: "Основные математические понятия и формулы.",
        content_kz: "Негізгі математикалық ұғымдар мен формулалар.",
        media_ru: null,
        media_kz: "https://example.com/media_kz_1.mp4",
        order_num: 1
    },
    {
        id: 2,
        title_ru: "Физика",
        title_kz: "Физика",
        content_ru: "Законы Ньютона и основы механики.",
        content_kz: "Ньютон заңдары және механика негіздері.",
        media_ru: "https://example.com/media_ru_2.mp4",
        media_kz: null,
        order_num: 2
    },
    {
        id: 3,
        title_ru: "Химия",
        title_kz: "Химия",
        content_ru: "Основы неорганической химии.",
        content_kz: "Бейорганикалық химия негіздері.",
        media_ru: null,
        media_kz: null,
        order_num: 3
    },
    {
        id: 4,
        title_ru: "Биология",
        title_kz: "Биология",
        content_ru: "Структура клетки и генетика.",
        content_kz: "Жасуша құрылымы және генетика.",
        media_ru: "https://example.com/media_ru_4.mp4",
        media_kz: "https://example.com/media_kz_4.mp4",
        order_num: 4
    },
    {
        id: 5,
        title_ru: "История Казахстана",
        title_kz: "Қазақстан тарихы",
        content_ru: "Ключевые события и исторические личности.",
        content_kz: "Негізгі оқиғалар мен тарихи тұлғалар.",
        media_ru: null,
        media_kz: "https://example.com/media_kz_5.mp4",
        order_num: 5
    },
    {
        id: 6,
        title_ru: "География",
        title_kz: "География",
        content_ru: "Физическая и экономическая география.",
        content_kz: "Физикалық және экономикалық география.",
        media_ru: "https://example.com/media_ru_6.mp4",
        media_kz: null,
        order_num: 6
    },
    {
        id: 7,
        title_ru: "Литература",
        title_kz: "Әдебиет",
        content_ru: "Важные произведения и авторы.",
        content_kz: "Маңызды шығармалар мен авторлар.",
        media_ru: null,
        media_kz: "https://example.com/media_kz_7.mp4",
        order_num: 7
    },
    {
        id: 8,
        title_ru: "Английский язык",
        title_kz: "Ағылшын тілі",
        content_ru: "Основы грамматики и словарный запас.",
        content_kz: "Грамматика негіздері және сөздік қор.",
        media_ru: "https://example.com/media_ru_8.mp4",
        media_kz: null,
        order_num: 8
    },
    {
        id: 9,
        title_ru: "Казахский язык",
        title_kz: "Қазақ тілі",
        content_ru: "Фонетика, морфология и синтаксис.",
        content_kz: "Фонетика, морфология және синтаксис.",
        media_ru: null,
        media_kz: "https://example.com/media_kz_9.mp4",
        order_num: 9
    },
   ]
