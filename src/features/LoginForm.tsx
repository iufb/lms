'use client'
import { Link, useRouter as useLocaleRouter } from "@/i18n/navigation";
import { LoginCreateBody, useLoginCreate } from "@/shared/api/generated";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation';

import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const LoginForm = () => {
    const t = useTranslations('login')
    const {
        handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm<LoginCreateBody>({ mode: 'onChange' });
    const router = useRouter()
    const localeRouter = useLocaleRouter()
    const { mutate, isPending, isError } = useLoginCreate({
        mutation: {
            onSuccess: (data) => {
                setCookie('access', data.access)
                setCookie('refresh', data.refresh)
                //TODO

                toast.success(t('success.loginSuccess'))

                if (data.phone_number == '+77773223232') {

                    setCookie('role', 'Админ')
                    router.push('/admin')
                } else {
                    localeRouter.push('/')
                }

                // Handle success

            }, onError: (error) => {
                console.error(error)
                if (error.message.includes('401')) {
                    toast.error(t('errors.invalidCredentials'))
                }
                // Handle error
            },
        }
    })

    const onRegisterFormSubmit: SubmitHandler<LoginCreateBody> = (data) => {
        mutate({ data })
    };


    return <Card className="max-w-lg w-full">
        <CardHeader>
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription>
                {t('subtitle')}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form
                onSubmit={handleSubmit(onRegisterFormSubmit)}
                className="flex w-full flex-col gap-2 max-w-lg 
 ">

                <Input
                    label={t('fields.phone_number')}
                    id="phone_number" placeholder={t('placeholders.phone_number')}
                    error={errors["phone_number"]?.message?.toString()}
                    {...register("phone_number", {
                        required: t('errors.phone_numberRequired')
                    })}

                />

                <Input
                    label={t('fields.password')}
                    id="password" type="password" placeholder={t('placeholders.password')}
                    error={errors["password"]?.message?.toString()}
                    {...register("password", {
                        required: t('errors.passwordRequired'),
                    })}
                />


                <Button loading={isPending} disabled={isPending} className="w-full mt-6">{t('buttons.submit')}</Button>

                <Link className="link" href={'/register'}>{t('buttons.signup')}</Link>




            </form>
        </CardContent>
    </Card>
}
