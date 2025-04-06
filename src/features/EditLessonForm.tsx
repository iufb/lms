'use client'
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import JoditEditorComponent from "@/shared/ui/jodit";
import { Label } from "@/shared/ui/label";
import { Controller, useForm } from "react-hook-form";

interface EditLessonFormProps {
    lessonId: number
}
export const EditLessonForm = ({ lessonId }: EditLessonFormProps) => {
    const { control, handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm()
    const onSubmit = (data: any) => {
        console.log(data)
    };

    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

        <Label className="text-2xl">Изменить данные урока</Label>
        <Button className="w-fit self-end">Изменить</Button>

        <h4>Редактирование (Русский) </h4>
        <Input {...register('title_ru')} label="Название на русском" />
        <Controller control={control} name={'content_ru'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на русском" value={value} onChange={(value) => onChange(value)} />} />
        <h4>Редактирование (Казахский)</h4>
        <Input {...register('title_kz')} label="Название на казахском" />
        <Controller control={control} name={'content_kz'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на казахском" value={value} onChange={(value) => onChange(value)} />} />

    </form>


}
