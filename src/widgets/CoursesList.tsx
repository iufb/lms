import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";

const courses: Course[] = [
    {
        id: 1,
        title_ru: "Курс по React",
        title_kz: "React курсы",
        description_ru: "Научитесь разрабатывать современные приложения с использованием React.",
        description_kz: "React көмегімен қазіргі заманғы қосымшаларды жасауға үйреніңіз.",
        price: 3000,
        is_published: true,
    },
    {
        id: 2,
        title_ru: "Курс по TypeScript",
        title_kz: "TypeScript курсы",
        description_ru: "Изучите основы TypeScript и его применение в разработке.",
        description_kz: "TypeScript негіздерін және оны әзірлеуде қолдануды үйреніңіз.",
        price: 2500,
        is_published: false,
    },
    {
        id: 3,
        title_ru: "Курс по Flutter",
        title_kz: "Flutter курсы",
        description_ru: "Создавайте мобильные приложения для Android и iOS с использованием Flutter.",
        description_kz: "Flutter көмегімен Android және iOS үшін мобильді қосымшаларды жасаңыз.",
        price: 4000,
        is_published: true,
    },
    {
        id: 4,
        title_ru: "Курс по JavaScript",
        title_kz: "JavaScript курсы",
        description_ru: "Изучите JavaScript с нуля до продвинутого уровня.",
        description_kz: "JavaScript-ті нөлден бастап жетілген деңгейге дейін үйреніңіз.",
        price: 2000,
        is_published: true,
    },
    {
        id: 5,
        title_ru: "Курс по Python",
        title_kz: "Python курсы",
        description_ru: "Погрузитесь в мир Python и начните писать свои первые скрипты.Погрузитесь в мир Python и начните писать свои первые скрипты.Погрузитесь в мир Python и начните писать свои первые скрипты.",
        description_kz: "Python әлеміне енсеңіз және алғашқы сценарийлеріңізді жаза бастаңыз.",
        price: 3500,
        is_published: false,
    },
];
export const CoursesList = () => {
    return <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
        {courses.map(c =>
            <Card key={c.id}>
                <CardHeader>
                    <CardTitle>{c.title_ru}</CardTitle>
                    <CardDescription>{c.title_kz}</CardDescription>
                    <Badge>{c.is_published ? "Опубликован" : "Не опубликован"}</Badge>
                </CardHeader>
                <CardContent>
                    <p className="h-12 overflow-hidden text-ellipsis line-clamp-2">{c.description_ru}</p>
                </CardContent>
                <CardFooter className="items-end">
                    <Button variant={'link'}>
                        <Link href={`/admin/courses/${c.id}`}>
                            Редактировать
                        </Link>
                    </Button>
                </CardFooter>

            </Card>
        )}
    </section>
}
