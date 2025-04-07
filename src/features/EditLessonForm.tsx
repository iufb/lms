'use client'
import { Lesson, useLessonPartialUpdate, useLessonRead } from "@/shared/api/generated";
import { required } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import JoditEditorComponent from "@/shared/ui/jodit";
import { Label } from "@/shared/ui/label";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface EditLessonFormProps {
    lessonId: number
}
type EditLessonDTO = Omit<Lesson, 'media_kz' | 'media_ru'> & { media_kz: FileList | string, media_ru: FileList | string }
export const EditLessonForm = ({ lessonId }: EditLessonFormProps) => {
    const { data: defaultValues } = useLessonRead(lessonId)
    const { mutate: update } = useLessonPartialUpdate({ mutation: {} })
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit,
        register,
        watch,
        getValues,
        reset,
        formState: { errors },
    } = useForm<EditLessonDTO>()
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues as EditLessonDTO);
        }
    }, [defaultValues, reset]);

    const onSubmit: SubmitHandler<EditLessonDTO> = (data) => {
        setLoading(true)
        if (data.media_ru && typeof data.media_ru !== 'string') {
            //upload to s3
        }
        if (data.media_kz && typeof data.media_kz !== 'string') {
            //upload to s3
        }
        const final: Lesson = { ...data, media_ru: defaultValues?.media_ru, media_kz: defaultValues?.media_kz }

        update({ id: lessonId, data: final })

        setLoading(false)
    };


    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

        <Label className="text-2xl">Изменить данные урока</Label>
        <Button className="w-fit self-end">Изменить</Button>

        <Input type="number" {...register('order_num', { required })} error={errors.order_num?.message} label="Номер урока" />

        <h4>Редактирование (Русский) </h4>
        <Input {...register('title_ru',)} label="Название на русском" />
        <Controller control={control} name={'content_ru'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на русском" value={value} onChange={(value) => onChange(value)} />} />
        <Input {...register('media_ru',)} error={errors.media_ru?.message} label="Видео" type='file' />
        {defaultValues?.media_ru && <video width="640" height="360" controls poster={defaultValues?.media_ru}>
            <source src={defaultValues?.media_ru} type="video/mp4" />
            Your browser does not support the video tag.
        </video>}

        <h4>Редактирование (Казахский)</h4>
        <Input {...register('title_kz')} label="Название на казахском" />
        <Controller control={control} name={'content_kz'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на казахском" value={value} onChange={(value) => onChange(value)} />} />
        <Input {...register('media_kz',)} error={errors.media_kz?.message} label="Видео" type='file' />
        {defaultValues?.media_kz && <video width="640" height="360" controls poster={defaultValues?.media_kz}>
            <source src={defaultValues?.media_kz} type="video/mp4" />
            Your browser does not support the video tag.
        </video>}


    </form>


}


