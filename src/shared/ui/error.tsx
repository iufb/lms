import { CircleX } from "lucide-react"
import { ReactNode } from "react"

export const Error = ({ children }: { children: ReactNode }) => {
    return <section className="px-2  py-3 border border-red-400 bg-red-300 rounded-lg flex  flex-center gap-2 text-red-700">
        <CircleX />
        {children}</section>
}
