'use client'
import { Link } from "@/i18n/navigation";
import { AvailableCoursesList200Item, useAvailableCoursesList } from "@/shared/api/generated";
import { getLocalized } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { Skeleton } from "@/shared/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";


export const AvaliableCoursesList = () => {
    const locale = useLocale()
    const t = useTranslations('main')

    const { data: courses, error, isLoading } = useAvailableCoursesList({ query: { queryKey: ['avaliable-course-list'] } })
    return <ShowFetchContent<AvailableCoursesList200Item>
        data={courses}
        isLoading={isLoading}
        isError={error}
        loader={<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">{Array.from({ length: 3 }).map((_, id) => <Skeleton key={id} className="h-[252px]" />)}</div>}
        error={<div>erorr</div>}
        content={
            <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 '>
                {courses?.map(c => {
                    const title = getLocalized(c, 'title', locale);
                    const description = getLocalized(c, 'description', locale);
                    return <Card key={c.id}>
                        <CardHeader >
                            <CardTitle className='h-8 overflow-hidden text-ellipsis line-clamp-3'>{title}</CardTitle>
                            <CardDescription className='h-12 overflow-hidden text-ellipsis line-clamp-3'>{description}</CardDescription>
                            <Badge>{t('price')} {c.price}</Badge>
                        </CardHeader>
                        <Separator />
                        <CardFooter className="items-end">
                            <Button variant={'link'}>
                                <Link href={`/courses/${c.id}`}>{t('showmore')}</Link>
                            </Button>
                        </CardFooter>

                    </Card>

                })}
            </section>

        }

    />
 }
