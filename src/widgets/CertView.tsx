'use client'

import { useUserCertificateByIdList } from "@/shared/api/generated"
import { useCert } from "@/shared/hooks/use-cert"
import { useEffect, useState } from "react"

interface CertViewProps {
    id: number
}
export const CertView = ({ id }: CertViewProps) => {
    const [url, setUrl] = useState('')
    const { getCert } = useCert({ mode: 'render' })
    const { data: cert } = useUserCertificateByIdList({ certificate_id: id })


    useEffect(() => {
        async function getUrl() {
            if (cert) {
                const certData = { ...cert, phone: `+7 771 532 21 50` }
                const url = await getCert(certData)
                setUrl(url)
            }
        }

        getUrl()

    }, [
        cert
    ])

    return <section className="w-full bg-black min-h-screen ">{url && <iframe className="w-full h-screen" src={url} />}</section>
}
