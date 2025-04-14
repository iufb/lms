import { CircleX } from "lucide-react"
import { ReactNode } from "react"

export const Error = ({ children }: { children: ReactNode }) => {
    return <section className="px-2 py-3 border border-red-400 bg-300">
        <CircleX />
        {children}</section>
}
