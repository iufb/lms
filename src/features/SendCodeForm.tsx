'use client'
import { useRouter } from "@/i18n/navigation";
import { useSendCodeCreate, verifyCodeCreate, VerifyCodeCreateBody } from "@/shared/api/generated";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/shared/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";

import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

type SendCodeFormProps = Omit<VerifyCodeCreateBody, 'code'>

export const SendCodeForm = ({ phone_number, ...data }: SendCodeFormProps) => {
    const tG = useTranslations()
    const t = useTranslations('verify')
    const [code, setCode] = useState('')

    const router = useRouter()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: verifyCodeCreate,
        onSuccess: (data) => {
            // Handle success
            toast.success(tG('registration.success.accountCreated'))
            deleteCookie(phone_number)
            router.push('/login')
        },
        onError: (error) => {
            // Handle error
            console.error(error)
            toast.error(tG('registration.errors.response'))
        },
    });
    const onSendCodeFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        mutate({ ...data, phone_number, code })
        console.log(code)
    }


    return <Card className="max-w-lg w-full">
        <CardHeader>
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <CardDescription>
                {t('description', { phone: phone_number })}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form
                onSubmit={onSendCodeFormSubmit}
                className="flex w-full items-center flex-col gap-2 ">

                <div className="space-y-2">
                    <InputOTP
                        maxLength={6}
                        value={code}
                        onChange={(code) => setCode(code)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                        </InputOTPGroup>

                        <InputOTPSeparator />


                        <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />

                        </InputOTPGroup>
                        <InputOTPSeparator />


                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>

                    </InputOTP>
                </div>


                <Button disabled={code.length < 6 || isPending} loading={isPending} className="w-full mt-6">{t('submitButton')}</Button>


            </form>
        </CardContent>
        <CardFooter >
            <SendAgain phone_number={phone_number} />
        </CardFooter>
    </Card>
}

const SendAgain = ({ phone_number }: { phone_number: string }) => {
    const [timer, setTimer] = useState(60)
    const t = useTranslations('verify')

    const { mutate: sendCode, isPending: isLoading } = useSendCodeCreate(
        {
            mutation: {
                onSuccess: () => {
                    setTimer(60)
                },
                onError: (e) => {
                    console.error(e)
                }
            }
        }
    );
    useEffect(() => {
        if (timer > 0) {
            const timer = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timer]);

    return <Button onClick={() => sendCode({ data: { phone_number } })} disabled={timer > 0} variant={'link'} className="mx-auto">
        {t('resendText')}
        {t('resendButton')}
        {timer > 0 && t('timer', { timer })}
    </Button>

}
