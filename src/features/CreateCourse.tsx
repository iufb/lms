"use client"

import { Button } from "@/shared/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/ui/drawer"
import { Input } from "@/shared/ui/input"
import { useForm } from "react-hook-form"

export function CreateCourse() {


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="default">Создать курс</Button>
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

    return <form className="w-full max-w-3xl mx-auto gap-2 flex flex-col" >
        <Input label="Название на русском" />
        <Input label="Название на казахском" />
        <Input label="Описание на русском" />
        <Input label="Описание на казахском" />
        <Input type="number" label="Цена" />
        <Button>Создать</Button>
        <DrawerClose asChild>
            <Button variant="outline">Отмена</Button>
        </DrawerClose>

    </form >
}
