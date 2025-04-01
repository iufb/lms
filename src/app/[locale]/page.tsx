
import { ModeToggle } from '@/features/ThemeToggler';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/ui/button';
import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('HomePage');
    return (
        <div>
            <h1 className='text-3xl text-red-500'>{t('title')}</h1>
            <Link href="/about">{t('about')}</Link>
            <Button variant={'default'}>Hello</Button>
            <ModeToggle />
        </div>
    );
}
