import { ErrorType } from "@/shared/api/custom-instance"
import { ReactNode } from "react"

interface ShowFetchContentProps<T> {
    isLoading: boolean,
    isError: ErrorType<void> | null,
    data?: T[]
    loader: ReactNode,
    error: ReactNode,
    content: ReactNode
}

export function ShowFetchContent<T>({ data, isError, isLoading, loader, error, content }: ShowFetchContentProps<T>) {
    if (isLoading) return loader
    if (isError) {
        if (isError.status == 404) {
            return <div className="w-full border border-yellow-500 bg-yellow-200 text-yellow-950 rounded-md text-center py-3">Нет записей</div>
        } else {
            return error
        }
    }
    if (!data) return loader
    if (data.length == 0) return <div className="w-full border border-yellow-500 bg-yellow-200 text-yellow-950 rounded-md text-center py-3">Нет записей</div>
    return content
}
