"use client"

import { Course, useCourseUpdate } from "@/shared/api/generated"
import { queryClient } from "@/shared/providers/query.provider"
import { Button } from "@/shared/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/ui/drawer"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

interface EditCourseProps {
    data: Course
}
export function EditCourse({ data }: EditCourseProps) {


    return (
        <Drawer>
            <DrawerTrigger asChild className="w-fit trigger">
                <span>Редактировать курс</span>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">Редактирование курса</DrawerTitle>
                    <DrawerDescription className="text-center">Здесь Вы можете изменить данные курса.</DrawerDescription>
                </DrawerHeader>
                <div className="w-full px-4 py-5">
                    <Form data={data} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

const required = 'Обязательное поле'

const Form = ({ data }: EditCourseProps) => {
    const {
        handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm<Course>({ mode: 'onSubmit', defaultValues: data });
    const { mutate: editCourse, isPending } = useCourseUpdate({
        mutation: {
            onSuccess: (course) => {
                const { title_ru } = course
                toast.success(`${title_ru} успешно изменен`)
                queryClient.invalidateQueries({ queryKey: ['course-list'] })
            }, onError: (e) => {
                console.error(e)
                toast.error('Произошла ошибка при  изменении курса')
            }
        }
    })
    const onSubmit: SubmitHandler<Course> = (data) => {
        if (!data.id) {
            return;
        }
        editCourse({ id: data.id, data })
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto gap-2 flex flex-col" >
        <Input {...register('title_ru', { required: 'Обязательное поле' })} label="Название на русском" />
        <Input {...register('title_kz', { required: 'Обязательное поле' })} label="Название на казахском" />
        <Textarea {...register('description_ru', { required: 'Обязательное поле' })} label="Описание на русском" />
        <Textarea {...register('description_kz', { required: 'Обязательное поле' })} label="Описание на казахском" />
        <Input {...register('price', { required: 'Обязательное поле' })} type="number" label="Цена" />
        <Button disabled={isPending} loading={isPending}>Изменить</Button>
        <DrawerClose asChild>
            <Button variant="outline">Отмена</Button>
        </DrawerClose>

    </form >
}
