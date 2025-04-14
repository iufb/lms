'use client'

import { useUserCoursesList } from "@/shared/api/generated"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { useTranslations } from "next-intl"

export const Profile = () => {
    const t = useTranslations('profile')
    const { data: userCourses, isLoading, error } = useUserCoursesList()
    return <section>
        <Card>
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('desc')}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
    </section>
}
