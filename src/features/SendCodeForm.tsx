'use client'
import { VerifyCodeCreateBody } from "@/shared/api/generated";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/shared/ui/input-otp";

import { useTranslations } from "next-intl";
import { FormEvent, useEffect, useState } from "react";

type SendCodeFormProps = Omit<VerifyCodeCreateBody, 'code'>

export const SendCodeForm = ({ phone_number, ...data }: SendCodeFormProps) => {
    const t = useTranslations('verify')
    const [code, setCode] = useState('')

    const onSendCodeFormSubmit = (e: FormEvent) => {
        e.preventDefault()
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


                <Button disabled={code.length < 6} className="w-full mt-6">{t('submitButton')}</Button>


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

    useEffect(() => {
        if (timer > 0) {
            const timer = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timer]);

    return <Button disabled={timer > 0} variant={'link'} className="mx-auto">
        {t('resendText')}
        {t('resendButton')}
        {timer > 0 && t('timer', { timer })}
    </Button>

}
