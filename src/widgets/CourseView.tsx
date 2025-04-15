'use client'

import { AccessCourse } from "@/features/AccessCourse";
import { useCourseRead } from "@/shared/api/generated";
import { getLocalized } from "@/shared/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Error } from "@/shared/ui/error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { LessonsList } from "@/widgets/LessonsList";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export const CourseView = ({ id }: { id: number }) => {
    const t = useTranslations('coursepage')
    const tLessons = useTranslations('lessonslist')
    const locale = useLocale()
    const { data: course, isError, isLoading } = useCourseRead(id)

    if (isLoading) return <div className="w-full h-40  flex-center"><Loader2 size={48} className="animate-spin text-primary" /></div>
    if (isError) return <Error>{t('error')}</Error>
    if (!course) return <div>not found</div>

    const title = getLocalized(course, 'title', locale);
    const description = getLocalized(course, 'description', locale);

    return <section className="stack gap-4">
        <Card>
            <CardHeader>
                <CardTitle className="mb-4 text-3xl font-bold  sm:text-4xl md:text-5xl">{title}</CardTitle>
                <CardDescription className="mb-6 text-lg text-muted-foreground">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <AccessCourse courseId={id} />
            </CardContent>
        </Card>

        <section className="flex flex-col md:flex-row gap-2">
            <Tabs defaultValue="about" className="md:max-w-2/3 md:w-full ">
                <TabsList className="self-center w-1/2">
                    <TabsTrigger value="about">{t('tabs.about')}</TabsTrigger>
                    <TabsTrigger value="lessons">{t('tabs.lessons')}</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                    <Card>
                        <CardHeader>
                            <CardTitle className="mb-4 text-2xl font-bold">{t('tabs.cardtitle')}</CardTitle>
                            <CardDescription >{description}</CardDescription>
                        </CardHeader>
                    </Card>

                </TabsContent>
                <TabsContent value="lessons">
                    <LessonsList courseId={id} mode="user" t={tLessons} />
                </TabsContent>
            </Tabs>
            <Card className="md:w-1/3 h-40">
                <CardHeader>
                    <CardTitle>{t('about.title')}</CardTitle>
                    <CardDescription className="opacity-0 h-0">Информация о курсе</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                            {t('about.hours')}
                        </h4>
                        <p className="text-[15px]">{course.hours}</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    </section>

}
