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
import { useHookFormMask } from 'use-mask-input';

export const LoginForm = () => {
    const t = useTranslations('login')
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginCreateBody>({ mode: 'onChange' });
    const registerWithMask = useHookFormMask(register);
    const router = useRouter()
    const localeRouter = useLocaleRouter()
    const { mutate, isPending } = useLoginCreate({
        mutation: {
            onSuccess: async (data) => {
                setCookie('access', data.access)
                setCookie('refresh', data.refresh)

                await fetch('/api/auth/set-cookies', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        role: data.role,
                    }),
                });

                toast.success(t('success.loginSuccess'))
                console.log(data)

                if (data.role == 'admin') {
                    router.push('/admin')
                }
                else if (data.role == 'ses') {
                    router.push('/admin/users')
                }
                else {
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

    const onLoginFormSubmit: SubmitHandler<LoginCreateBody> = (data) => {
        mutate({ data: { ...data, phone_number: data.phone_number.replace(/\s+/g, '') } })
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
                onSubmit={handleSubmit(onLoginFormSubmit)}
                className="flex w-full flex-col gap-2 max-w-lg 
 ">
                <Input
                    label={t('fields.phone_number')}
                    id="phone_number" placeholder={t('placeholders.phone_number')}
                    error={errors["phone_number"]?.message?.toString()}
                    {...registerWithMask("phone_number", ['+7 999 999 99 99'], {
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
