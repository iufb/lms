'use client'
import { generatePresignedUrlCreate, Lesson, LessonPartialUpdateBody, useLessonPartialUpdate, useLessonRead } from "@/shared/api/generated";
import { required, uploadToS3 } from "@/shared/lib/utils";
import { queryClient } from "@/shared/providers/query.provider";
import { presignedUrlResponse } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import JoditEditorComponent from "@/shared/ui/jodit";
import { Label } from "@/shared/ui/label";
import isEqual from "lodash.isequal";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { toast } from "sonner";

interface EditLessonFormProps {
    lessonId: number
}

type EditLessonDTO = Omit<Lesson, 'media_kz' | 'media_ru'> & { media_kz: FileList | string, media_ru: FileList | string }
export const EditLessonForm = ({ lessonId }: EditLessonFormProps) => {
    const { data: defaultValues, queryKey } = useLessonRead(lessonId)
    const { mutate: update } = useLessonPartialUpdate({
        mutation: {
            onSuccess: () => {
                setLoading(false)
                toast.success('Урок изменен')
                queryClient.invalidateQueries({ queryKey })
            },
            onError: () => {

                setLoading(false)
                toast.error(`Ошибка при изменении урока`)
            },
        }
    })

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

    const onSubmit: SubmitHandler<EditLessonDTO> = async (data) => {
        if (!defaultValues) return;

        setLoading(true)

        let media_ru
        let media_kz
        if (data.media_ru && typeof data.media_ru !== 'string') {
            const file_ru = data.media_ru[0]
            const url = await generatePresignedUrlCreate({ file_name: file_ru.name, content_type: file_ru.type }) as presignedUrlResponse

            const isOk = await uploadToS3(url.upload_url, file_ru)
            if (isOk) {
                toast.success(`Видео  ${file_ru.name} загружено`)
                media_ru = url.file_key
            } else {
                toast.error(`Ошибка загрузки видео ${file_ru.name}`)
            }
        }
        if (data.media_kz && typeof data.media_kz !== 'string') {
            const file_kz = data.media_kz[0]
            const url = await generatePresignedUrlCreate({ file_name: file_kz.name, content_type: file_kz.type }) as presignedUrlResponse

            const isOk = await uploadToS3(url.upload_url, file_kz)
            if (isOk) {
                toast.success(`Видео  ${file_kz.name} загружено`)
                media_kz = url.file_key
            } else {
                toast.error(`Ошибка загрузки видео ${file_kz.name}`)
            }
        }

        const final: LessonPartialUpdateBody = {
            ...data, media_ru, media_kz
        }

        update({ id: lessonId, data: final })

    };

    const watched = watch();

    const isUnchanged = useMemo(() => {
        return isEqual(defaultValues, watched);
    }, [defaultValues, watched]);

    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

        <Label className="text-2xl">Изменить данные урока</Label>
        <Button disabled={loading || isUnchanged} loading={loading} className="w-fit self-end">Изменить</Button>

        <Input type="number" {...register('order_num', { required })} error={errors.order_num?.message} label="Номер урока" />

        <h4>Редактирование (Русский) </h4>
        <Input {...register('title_ru',)} label="Название на русском" />
        <Controller control={control} name={'content_ru'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на русском" value={value} onChange={(value) => onChange(value)} />} />
        <Input {...register('media_ru',)} error={errors.media_ru?.message} label="Видео" type='file' />
        {defaultValues?.media_ru && <ReactPlayer playing={false}
            controls={true}
            width="100%"
            height="100%"
            url={defaultValues.media_ru}
        />}

        <h4>Редактирование (Казахский)</h4>
        <Input {...register('title_kz')} label="Название на казахском" />
        <Controller control={control} name={'content_kz'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на казахском" value={value} onChange={(value) => onChange(value)} />} />
        <Input {...register('media_kz',)} error={errors.media_kz?.message} label="Видео" type='file' />
        {defaultValues?.media_kz && <ReactPlayer playing={false}
            controls={true}
            width="100%"
            height="100%"
            url={defaultValues.media_kz}
        />}


    </form>


}


