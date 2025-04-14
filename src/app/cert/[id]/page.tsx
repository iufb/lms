import { CertView } from "@/widgets/CertView"

interface Props {
    params: Promise<{ id: number }>
}
export default async function Page({ params }: Props) {
    const { id } = await params
    return <CertView id={id} />
}
