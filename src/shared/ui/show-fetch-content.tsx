import { ErrorType } from "@/shared/api/custom-instance"
import { ReactNode } from "react"

interface ShowFetchContentProps<T> {
    isLoading: boolean,
    isError: ErrorType<void | unknown> | null,
    data?: T[] | T
    loader: ReactNode,
    error: ReactNode,
    content: ReactNode
    customError?: boolean
}

export function ShowFetchContent<T>({ customError, data, isError, isLoading, loader, error, content }: ShowFetchContentProps<T>) {
    if (isLoading) return loader
    if (isError) {
        if (isError.status == 404 && !customError) {
            return <div className="w-full border border-yellow-500 bg-yellow-200 text-yellow-950 rounded-md text-center py-3">Нет записей</div>
        } else if (customError) {
            return error
        } else {
            <div className="w-full border border-red-500 bg-red-200 text-red-950 rounded-md text-center py-3">Ошибка загрузки</div>
        }
    }
    if (!data) return loader
    return content
}
