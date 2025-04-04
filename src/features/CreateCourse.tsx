"use client"

import { Course, useCourseCreate } from "@/shared/api/generated"
import { Button } from "@/shared/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/ui/drawer"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export function CreateCourse() {


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="w-fit" variant="default">Создать курс</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">Создание нового курса</DrawerTitle>
                    <DrawerDescription className="text-center">Заполните форму, чтобы создать новый курс. </DrawerDescription>
                </DrawerHeader>
                <div className="w-full px-4 py-5">
                    <Form />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

type FormDTO = Omit<Course, 'id' | 'is_published'>
const required = 'Обязательное поле'

const Form = () => {
    const {
        handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm<FormDTO>({ mode: 'onSubmit' });
    const { mutate: createCourse, isPending } = useCourseCreate({
        mutation: {
            onSuccess: (course) => {
                const { title_ru } = course
                toast.success(`${title_ru} успешно создан `)
            }, onError: (e) => {
                console.error(e)
                toast.error('Произошла ошибка при создании курса')
            }
        }
    })
    const onSubmit: SubmitHandler<FormDTO> = (data) => {
        createCourse({ data })
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto gap-2 flex flex-col" >
        <Input {...register('title_ru', { required: 'Обязательное поле' })} label="Название на русском" />
        <Input {...register('title_kz', { required: 'Обязательное поле' })} label="Название на казахском" />
        <Textarea {...register('description_ru', { required: 'Обязательное поле' })} label="Описание на русском" />
        <Textarea {...register('description_kz', { required: 'Обязательное поле' })} label="Описание на казахском" />
        <Input {...register('price', { required: 'Обязательное поле' })} type="number" label="Цена" />
        <Button disabled={isPending} loading={isPending}>Создать</Button>
        <DrawerClose asChild>
            <Button variant="outline">Отмена</Button>
        </DrawerClose>

    </form >
}
