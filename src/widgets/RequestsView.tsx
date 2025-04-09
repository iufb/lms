'use client'

import { useCourseRead, usePaymentList, usePaymentPartialUpdate, useUserCoursesCreate, useUserList } from "@/shared/api/generated";
import { Payment } from "@/shared/api/generated1";
import { queryClient } from "@/shared/providers/query.provider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { QueryKey } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const RequestsView = () => {
    const { data, isLoading, error, queryKey } = usePaymentList()
    return <Card>
        <CardHeader>
            <CardTitle>Запросы на доступ</CardTitle>
            <CardDescription>Здесь Вы можете дать доступ к курсу пользователю</CardDescription>
        </CardHeader>
        <CardContent>
            <ShowFetchContent
                data={data}
                isLoading={isLoading}
                isError={error}
                loader={<div className="flex flex-col gap-2">
                    <Skeleton className="w-full h-8" />
                    <Separator />
                    <Skeleton className="w-full h-14" />
                </div>}
                error={<div>error</div>}
                content={
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >ФИО</TableHead>
                                <TableHead>ИИН</TableHead>
                                <TableHead>Должность</TableHead>
                                <TableHead>Курс</TableHead>
                                <TableHead>Цена</TableHead>
                                <TableHead className="text-center">Разрешить доступ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {data?.map((r) => <RequestItem qKey={queryKey} key={r.id} payment={r} />)}
                        </TableBody>
                    </Table>
                }
            />

        </CardContent>
    </Card>

};


interface RequestItemProps {
    payment: Payment
    qKey: QueryKey
}

interface CellRenderProps {
    isLoading: boolean,
    isError: boolean
    content: any
}

const CellRender = ({ isLoading, isError, content }: CellRenderProps) => {
    if (isLoading) return <Skeleton className="w-12 h-6 rounded-lg" />
    if (isError) return <span>N/A</span>
    return content

}

const RequestItem = ({ payment, qKey }: RequestItemProps) => {
    const { data: user, isLoading, isError } = useUserList({ user_id: payment.user })
    const { data: course, isLoading: isLoadingCourse, isError: courseError } = useCourseRead(payment.course)
    return <TableRow>
        <TableCell><CellRender
            isLoading={isLoading}
            isError={isError}
            content={user?.full_name}
        /></TableCell>
        <TableCell>
            <CellRender
                isLoading={isLoading}
                isError={isError}
                content={user?.iin}
            />
        </TableCell>
        <TableCell><CellRender
            isLoading={isLoading}
            isError={isError}
            content={user?.position}
        />
        </TableCell>
        <TableCell ><CellRender
            isLoading={isLoadingCourse}
            isError={courseError}
            content={course?.title_ru}
        />
        </TableCell>
        <TableCell ><CellRender
            isLoading={isLoadingCourse}
            isError={courseError}
            content={course?.price}
        />
        </TableCell>
        <TableCell className="text-center" >
            <CellRender
                isLoading={isLoadingCourse || isLoading}
                isError={isError || courseError}
                content={<GiveAccessButton qKey={qKey} payment={payment} courseId={payment.course} userId={payment.user} courseName={course?.title_ru} fullname={user?.full_name} />}
            />
        </TableCell>
    </TableRow>

}

interface GiveAccessButtonProps {
    userId: number,
    courseId: number
    qKey: QueryKey,
    courseName?: string,
    fullname?: string | null
    payment: Payment
}

const GiveAccessButton = ({ qKey, payment, userId, courseId, courseName, fullname }: GiveAccessButtonProps) => {
    const { mutate, isPending } = useUserCoursesCreate({
        mutation: {
            onSuccess: () => {
                toast.success(`Доступ к курсу ${courseName} для  ${fullname} открыт`)
                if (payment.id)
                    updatePayment({ id: payment.id, data: { ...payment, status: 'paid' } })
            }, onError: (e) => {
                console.error(e)
                toast.error('Произошла ошибка, попробуйте позже')
            }
        }
    })
    const { mutate: updatePayment } = usePaymentPartialUpdate({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: qKey })
            },
        }
    })
    const giveAccess = () => {
        mutate({ data: { course_id: courseId, user_id: userId } })
    }
    return <AlertDialog>
        <AlertDialogTrigger className="trigger">Разрешить</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Разрешить доступ</AlertDialogTitle>
                <AlertDialogDescription>
                    Вы уверены что хотите разрешить доступ к курсу {courseName} для  {fullname}                 </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Отменить</AlertDialogCancel>
                <AlertDialogAction disabled={isPending} onClick={giveAccess}>{isPending ? <Loader2 className='animate-spin' /> : 'Продолжить'}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

}
