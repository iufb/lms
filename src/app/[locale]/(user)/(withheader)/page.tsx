import { AvaliableCoursesList } from '@/widgets/AvaliableCoursesList';
import { Metadata, ResolvingMetadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
export async function generateMetadata(
    parent: ResolvingMetadata
): Promise<Metadata> {
    const t = await getTranslations('main')
    return {
        title: t('meta.title'),
        description: t('meta.description')
    }
}
export default function HomePage() {
    const t = useTranslations('main');
    return (
        <section className='flex flex-col gap-5'>
            <h1 className='text-center text-4xl font-semibold tracking-tight sm:text-5xl'>{t('title')}</h1>
            <p className='mx-auto mt-6 max-w-3xl text-center leading-7 text-muted-foreground sm:text-lg'>{t('subtitle')}</p>
            <AvaliableCoursesList />
        </section>
    );
}



