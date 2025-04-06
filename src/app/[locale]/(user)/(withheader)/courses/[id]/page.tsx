import { getLocalized } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { LessonsList } from "@/widgets/LessonsList"
import { BookOpen } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
type Props = {
    params: Promise<{ id: number }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    const t = await getTranslations('coursepage')
    const locale = await getLocale()
    const title = getLocalized(course, 'title', locale);
    const description = getLocalized(course, 'description', locale);

    return <section className="stack gap-5">
        <Card>
            <CardHeader>
                <CardTitle className="mb-4 text-3xl font-bold text-black sm:text-4xl md:text-5xl">{title}</CardTitle>
                <CardDescription className="mb-6 text-lg text-muted-foreground">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button>
                    <>
                        <BookOpen /> {t('buttons.start')}</>
                </Button>
            </CardContent>
        </Card>

        <section className="flex flex-col md:flex-row gap-2">
            <Tabs defaultValue="about" className="md:flex-2/3 ">
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
                    <LessonsList courseId={id} />
                </TabsContent>
            </Tabs>
            <Card className="md:flex-1/3">
                <CardHeader>
                    <CardTitle>{t('about.title')}</CardTitle>
                    <CardDescription className="opacity-0 h-0">Информация о курсе</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                            {t('about.added')}
                        </h4>
                        <p className="text-[15px]">{new Date().getDate()}</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    </section>
}

const course = {
    id: 10,
    title_ru: "Курс по React",
    title_kz: "React курсы",
    description_ru: "Современный подход к созданию интерфейсов.",
    description_kz: "Интерфейстерді жасаудың заманауи тәсілі.",
    price: 22900.00,
    is_published: true
}


