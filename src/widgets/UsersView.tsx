'use client'
import { GetUsersListList200Item, useGetUsersListList, useUserCertificateByUserList } from "@/shared/api/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Error } from "@/shared/ui/error";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import Link from "next/link";
import { useState } from "react";
export const UsersView = () => {
    const { data: users, isLoading: usersLoading, error: usersError } = useGetUsersListList()

    return <Card>
        <CardHeader>
            <CardTitle>Пользователи</CardTitle>
            <CardDescription>Список пользователей</CardDescription>
        </CardHeader>
        <CardContent>
            <ShowFetchContent
                data={users}
                isLoading={usersLoading}
                isError={usersError}
                error={<Error>Ошибка загрузки</Error>}
                loader={<section></section>}
                content={<Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >ФИО</TableHead>
                            <TableHead>ИИН</TableHead>
                            <TableHead>Должность</TableHead>
                            <TableHead>Место работы</TableHead>
                            <TableHead>Сертификаты</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {users?.map((u) => <TableItem key={u.id} user={u} />)}
                    </TableBody>
                </Table>
                }
            />
        </CardContent>
    </Card>
};

interface TableItemProps {
    user: GetUsersListList200Item
}
const TableItem = ({ user }: TableItemProps) => {
    return <TableRow>
        <TableCell>{user.full_name}</TableCell>
        <TableCell>{user.iin}</TableCell>
        <TableCell>{user.position}</TableCell>
        <TableCell>{user.workplace}</TableCell>
        <TableCell>{user.id && <SertificatesDialog id={user.id} />}</TableCell>
    </TableRow>
}

const SertificatesDialog = ({ id }: { id: number }) => {
    const [open, setOpen] = useState(false)
    const { data, isLoading, error } = useUserCertificateByUserList({ user_id: id }, { query: { enabled: open } })
    return <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogTrigger onClick={() => setOpen(true)}>Посмотреть</DialogTrigger>
        <DialogContent className="min-w-4xl">
            <DialogHeader>
                <DialogTitle>Сертификаты</DialogTitle>
                <DialogDescription>
                    Список сертификатов пользователя
                </DialogDescription>
            </DialogHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Название</TableHead>
                        <TableHead>Часы</TableHead>
                        <TableHead>Сертификат</TableHead>
                    </TableRow></TableHeader>
                <ShowFetchContent
                    data={data}
                    isLoading={isLoading}
                    isError={error}
                    loader={Array.from({ length: 4 }).map((_, id) => <TableRow key={id}>
                        <TableCell><Skeleton className="rounded-lg w-full h-5" /></TableCell>
                        <TableCell><Skeleton className="rounded-lg w-full h-5" /></TableCell>
                        <TableCell><Skeleton className="rounded-lg w-full h-5" /></TableCell>
                    </TableRow>
                    )}
                    customError
                    error={<TableCaption><Error>Ошибка загрузки</Error></TableCaption>}
                    content={<TableBody>{data?.map(s => {
                        const { title_ru, hours } = s.course ? s.course : {}
                        return <TableRow key={s.id}>
                            <TableCell>{title_ru as string}</TableCell>
                            <TableCell>{hours as string}</TableCell>
                            <TableCell><Link target="_blank" href={`/cert/${s.id}`}>Посмотреть</Link></TableCell>
                        </TableRow>
                    })}</TableBody>}
                />
            </Table>

        </DialogContent>
    </Dialog>
}
