import { Link } from '@/i18n/navigation';
import { getLocalized } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useLocale, useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('main');
    const locale = useLocale()
    return (
        <section className='flex flex-col gap-5'>
            <h1 className='text-center text-4xl font-semibold tracking-tight sm:text-5xl'>{t('title')}</h1>
            <p className='mx-auto mt-6 max-w-3xl text-center leading-7 text-muted-foreground sm:text-lg'>{t('subtitle')}</p>
            <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 '>
                {courses.map(c => {
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
        </section>
    );
}


const courses = [
    {
        id: 1,
        title_ru: "Основы программирования",
        title_kz: "Бағдарламалаудың негіздері",
        description_ru: "Изучите базовые принципы программирования на практике.",
        description_kz: "Бағдарламалаудың негізгі принциптерін үйреніңіз.",
        price: 0.00,
        is_published: true
    },
    {
        id: 2,
        title_ru: "Frontend-разработка",
        title_kz: "Frontend-әзірлеу",
        description_ru: "Научитесь создавать красивые и удобные сайты.",
        description_kz: "Әдемі және ыңғайлы веб-сайттарды жасауды үйреніңіз.",
        price: 19900.00,
        is_published: true
    },
    {
        id: 3,
        title_ru: "Backend на Node.js",
        title_kz: "Node.js арқылы Backend",
        description_ru: "Разработка серверной логики на JavaScript.",
        description_kz: "JavaScript арқылы серверлік логиканы әзірлеу.",
        price: 24900.00,
        is_published: true
    },
    {
        id: 4,
        title_ru: "Разработка мобильных приложений",
        title_kz: "Мобильді қолданбаларды жасау",
        description_ru: "Создание приложений для Android и iOS.",
        description_kz: "Android және iOS үшін қолданбалар жасау.",
        price: 29900.00,
        is_published: true
    },
    {
        id: 5,
        title_ru: "Базы данных и SQL",
        title_kz: "Деректер базасы және SQL",
        description_ru: "Научитесь работать с реляционными базами данных.",
        description_kz: "Реляциялық деректер базасымен жұмыс істеуді үйреніңіз.",
        price: 14900.00,
        is_published: false
    },
    {
        id: 6,
        title_ru: "Курс по HTML и CSS",
        title_kz: "HTML және CSS курсы",
        description_ru: "Основы вёрстки сайтов с нуля.",
        description_kz: "Сайттарды нөлден бастап белгілеу негіздері.",
        price: 9900.00,
        is_published: true
    },
    {
        id: 7,
        title_ru: "Основы Python",
        title_kz: "Python негіздері",
        description_ru: "Простой вход в программирование с Python.",
        description_kz: "Python көмегімен бағдарламалауға қарапайым кіріспе.",
        price: 0.00,
        is_published: true
    },
    {
        id: 8,
        title_ru: "Machine Learning для начинающих",
        title_kz: "Machine Learning бастаушыларға арналған",
        description_ru: "Основы машинного обучения с примерами.",
        description_kz: "Машиналық оқытудың негіздері мен мысалдары.",
        price: 39900.00,
        is_published: false
    },
    {
        id: 9,
        title_ru: "Git и контроль версий",
        title_kz: "Git және нұсқаларды басқару",
        description_ru: "Научитесь работать с системами контроля версий.",
        description_kz: "Нұсқаларды басқару жүйелерімен жұмыс істеуді үйреніңіз.",
        price: 5900.00,
        is_published: true
    },
    {
        id: 10,
        title_ru: "Курс по React",
        title_kz: "React курсы",
        description_ru: "Современный подход к созданию интерфейсов.",
        description_kz: "Интерфейстерді жасаудың заманауи тәсілі.",
        price: 22900.00,
        is_published: true
    }
];
