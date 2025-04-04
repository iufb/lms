'use client'
import { EditCourse } from "@/features/EditCourse";
import { Course, useCourseList } from "@/shared/api/generated";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { Skeleton } from "@/shared/ui/skeleton";
import Link from "next/link";


export const CoursesList = () => {
    const { data, error, isLoading } = useCourseList({ query: { queryKey: ['course-list'] } })
    return <ShowFetchContent<Course>
        data={data}
        isLoading={isLoading}
        isError={error}
        loader={<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">{Array.from({ length: 3 }).map((_, id) => <Skeleton key={id} className="h-[252px]" />)}</div>}
        error={<div>erorr</div>}
        content={
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
                {data?.map(c =>
                    <Card key={c.id}>
                        <CardHeader >
                            <CardTitle>{c.title_ru}</CardTitle>
                            <CardDescription>{c.title_kz}</CardDescription>
                            <Badge>{c.is_published ? "Опубликован" : "Не опубликован"}</Badge>
                        </CardHeader>
                        <CardContent>
                            <p className="h-12 overflow-hidden text-ellipsis line-clamp-2">{c.description_ru}</p>
                        </CardContent>
                        <Separator />
                        <CardFooter className="items-end">

                            <EditCourse data={c} />
                            <Button variant={'link'}>
                                <Link href={`/admin/courses/${c.id}`}>
                                    Редактировать уроки
                                </Link>
                            </Button>
                        </CardFooter>

                    </Card>
                )}
            </section>

        }

    />
 }
