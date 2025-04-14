import { CertView } from "@/widgets/CertView"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: 'Сертификат',
    description: '...',
}

interface Props {
    params: Promise<{ id: number }>
}
export default async function Page({ params }: Props) {
    const { id } = await params
    return <CertView id={id} />
}
