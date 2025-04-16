import { SendCodeForm } from "@/features/SendCodeForm";
import { Link } from "@/i18n/navigation";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from 'next/headers';

export async function generateMetadata(
): Promise<Metadata> {

    const t = await getTranslations('verify')


    return {
        title: t('meta.title'),
        description: t('meta.description')
    }
}
interface Props {
    searchParams: Promise<{ phone_number: string }>
}
export default async function VerifyPage({ searchParams }: Props) {
    const { phone_number: phone } = await searchParams
    const dataStr = await getCookie(`+${phone}`.replace(' ', ''), { cookies })
    const data = dataStr ? JSON.parse(dataStr as string) : null
    const t = await getTranslations('verify.noData')

    return <section className="container flex-center">
        {data ? <SendCodeForm {...data} /> :
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full">
                        <Link href={'/register'}>
                            {t('button')}
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        }
    </section>
}


