import { UsersView } from "@/widgets/UsersView";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Пользователи',
    description: 'Список пользователей системы',
}

export default function UsersPage() {
    return <UsersView />
}
