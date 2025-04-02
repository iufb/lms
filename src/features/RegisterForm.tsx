'use client'
import { Link, useRouter } from "@/i18n/navigation"
import { useSendCodeCreate } from "@/shared/api/generated"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { setCookie } from 'cookies-next'
import { useTranslations } from "next-intl"
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from "sonner"

type RegisterDTO = {
    phone_number: string;
    full_name: string;
    password: string;
    confirmPassword: string;
    position: string;
    workplace: string;
    iin: string;
};

export const RegisterForm = () => {
    const t = useTranslations('registration')
    const {
        handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm<RegisterDTO>({ mode: 'onChange' });
    const router = useRouter()
    const password = watch('password', '')

    const { mutate: sendCode, isPending: isLoading } = useSendCodeCreate({
        mutation: {
            onSuccess: () => {
                const data = getValues()
                setCookie(data.phone_number as string, JSON.stringify(data))
                router.push(`/verify?phone_number=${data.phone_number}`)
                console.log(data)
            },
            onError: (e) => {
                if (e.message.includes('409')) {
                    toast.error(t('errors.alreadyExists'))
                    return;
                }
                toast.error(t('errors.response'))
                console.log(e.message)

            }
        }

    });
    const onRegisterFormSubmit: SubmitHandler<RegisterDTO> = (data) => {
        sendCode({ data: { phone_number: data.phone_number } })
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
                className="flex w-full flex-col gap-2  max-w-lg">

                <Input
                    label={t('fields.name')}
                    id="name" placeholder={t('placeholders.name')}
                    error={errors["full_name"]?.message?.toString()}
                    {...register("full_name", {
                        required: t('errors.nameRequired')
                    })}

                />

                <Input
                    label={t('fields.phone_number')}
                    id="phone_number" placeholder={t('placeholders.phone_number')}
                    error={errors["phone_number"]?.message?.toString()}
                    {...register("phone_number", {
                        required: t('errors.phoneRequired'),
                        validate: {
                            validatePhoneNumber: (value) =>
                                /^\+7\d{10}$/.test(value) || t('errors.phoneInvalid'),
                        }
                    })}

                />

                <Input
                    label={t('fields.iin')}
                    id="iin" placeholder={t('placeholders.iin')}
                    error={errors["iin"]?.message?.toString()}
                    {...register("iin", {
                        required: t('errors.iinRequired'),
                        validate: {
                            onlyNumbers: (value) =>
                                /^\d+$/.test(value) || t('errors.iinInvalid'),
                            isValid: (value) => value.length == 12 ||
                                t('errors.iinInvalid'),

                        }
                    })}

                />


                <Input
                    label={t('fields.position')}
                    id="position" placeholder={t('placeholders.position')}

                    error={errors["position"]?.message?.toString()}
                    {...register("position", {
                        required: t('errors.positionRequired')
                    })}

                />

                <Input
                    label={t('fields.workplace')}
                    id="workplace" placeholder={t('placeholders.workplace')}

                    error={errors["workplace"]?.message?.toString()}
                    {...register("workplace", {
                        required: t('errors.workplaceRequired')
                    })}

                />

                <Input
                    label={t('fields.password')}
                    id="password" type="password" placeholder={t('placeholders.password')}
                    error={errors["password"]?.message?.toString()}
                    {...register("password", {
                        required: t('errors.passwordRequired'), validate: {
                            hasMinimumLength: (value) =>
                                value.length >= 6 ||
                                t('errors.passwordMin'),
                        }
                    })}
                />


                <Input
                    label={t('fields.confirmPassword')}
                    id="confirmPassword" type="password" placeholder={t('placeholders.confirmPassword')}

                    error={errors["confirmPassword"]?.message?.toString()}
                    {...register("confirmPassword", {
                        validate: {
                            isEqual: (value) => value == password ||
                                t('errors.passwordMismatch'),

                        }
                    })}
                />


                <Button disabled={isLoading} loading={isLoading} className="w-full mt-6">{t('buttons.submit')}</Button>

                <Link className="link" href={'/login'}>{t('buttons.login')}</Link>
            </form>
        </CardContent>
    </Card>
}
