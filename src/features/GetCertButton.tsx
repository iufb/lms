import { FinalTestResultsList200Item, useCourseRead, useUserCertificateByIdList, useUserCertificatesList, useUserList } from "@/shared/api/generated";
import { useCert } from "@/shared/hooks/use-cert";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { useTranslations } from "next-intl";


interface GetCertButtonProps {
    courseId: number
    results: FinalTestResultsList200Item[]
}


export const GetCertButton = ({ courseId, results }: GetCertButtonProps) => {
    const t = useTranslations('cert')
    const { getCert } = useCert({ mode: 'save' })
    const { data: certs } = useUserCertificatesList()
    const bestResult = (results.sort((a, b) => {
        if (!a.score || !b.score) return 1
        return a.score - b.score
    }))[0]

    const userId = bestResult?.user

    if (!userId) return <div>no user id</div>;

    const { data: course, } = useCourseRead(courseId)
    const { data: user } = useUserList({ user_id: userId })
    const cert = certs?.find(c => c.course == courseId)

    const { data: certData } = useUserCertificateByIdList({ certificate_id: cert?.id ?? 0 })

    if (!certData) return <Skeleton className="w-full h-10 rounded-lg" />

    const data = {
        ...certData, phone: `+7 771 532 21 50`
    }

    return <Button onClick={() => getCert(data)}>{t('getCert')}</Button>
}
