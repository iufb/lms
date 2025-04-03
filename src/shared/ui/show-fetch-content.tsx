import { ReactNode } from "react"

interface ShowFetchContentProps<T> {
    isLoading: boolean,
    isError: boolean,
    data?: T[]
    loader: ReactNode,
    error: ReactNode,
    content: ReactNode
}

export function ShowFetchContent<T>({ data, isError, isLoading, loader, error, content }: ShowFetchContentProps<T>) {
    if (isLoading) return loader
    if (isError) return error
    if (!data) return loader
    if (data.length == 0) return <div>Нет записей</div>
    return content
}
