'use client'
import { generatePresignedUrlCreate, Lesson, useLessonCreate } from "@/shared/api/generated";
import { uploadToS3 } from "@/shared/lib/utils";
import { queryClient } from "@/shared/providers/query.provider";
import { presignedUrlResponse } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import JoditEditorComponent from "@/shared/ui/jodit";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
const required = 'Обязательное поле'
type LessonDTO = Omit<Lesson, 'media_kz' | 'media_ru'> & { media_kz: FileList, media_ru: FileList }

export const CreateLesson = ({ id }: { id: number }) => {
    const { control, handleSubmit,
        register,
        formState: { errors },
    } = useForm<LessonDTO>()

    const { mutate } = useLessonCreate({
        mutation: {
            onSuccess: () => {
                toast.success('Урок создан')
                setLoading(false)
                queryClient.invalidateQueries({ queryKey: ['/course-lessons/', { course_id: id }] })
            },
            onError: () => {
                toast.error(`Ошибка при создании урока`)
                setLoading(false)
            },
        }
    })
    const [loading, setLoading] = useState(false)
    const onCreate: SubmitHandler<LessonDTO> = async (data) => {
        setLoading(true)
        const media_ru = data.media_ru[0]
        const media_kz = data.media_kz[0]
        const uploadedUrls = { media_ru: '', media_kz: '' }
        if (media_ru && !uploadedUrls.media_ru) {
            const url = await generatePresignedUrlCreate({ file_name: media_ru.name, content_type: media_ru.type }) as presignedUrlResponse
            const isOk = await uploadToS3(url.upload_url, media_ru)
            if (isOk) {
                toast.success(`Видео  ${media_ru.name} загружено`)
                uploadedUrls.media_ru = url.file_key
            } else {
                toast.error(`Ошибка загрузки видео ${media_ru.name}`)
            }
        }
        if (media_kz && !uploadedUrls.media_kz) {
            const url = await generatePresignedUrlCreate({ file_name: media_kz.name, content_type: media_kz.type }) as presignedUrlResponse
            const isOk = await uploadToS3(url.upload_url, media_kz)
            if (isOk) {
                toast.success(`Видео  ${media_kz.name} загружено`)
                uploadedUrls.media_kz = url.file_key
            } else {
                toast.error(`Ошибка загрузки видео ${media_kz.name}`)
            }
        }

        mutate({ data: { ...data, ...uploadedUrls, course: id } })


        console.log(data)
    };

    return <Sheet>
        <SheetTrigger className="w-fit self-end trigger" >
            Создать урок
        </SheetTrigger>
        <SheetContent className="min-w-[100vw] lg:min-w-[90vw]">
            <SheetHeader>
                <SheetTitle>Создание урока</SheetTitle>
                <SheetDescription>
                    Здесь Вы можете создать урок для курса. Чтобы продолжить заполните поля для 2-ух языков.
                </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-2 px-1 lg:px-3 h-full overflow-auto">

                <Button disabled={loading} loading={loading} className="w-fit self-end">Создать</Button>
                <h3>Редактирование (Русский) </h3>
                <Input type="number" {...register('order_num', { required })} error={errors.order_num?.message} label="Номер урока" />
                <Input {...register('title_ru', { required })} error={errors.title_ru?.message} label="Название на русском" />
                <Input {...register('media_ru')} error={errors.media_ru?.message} label="Видео" type='file' />
                <Controller control={control} rules={{ required }} name={'content_ru'} render={({ field: { value, onChange } }) => <JoditEditorComponent error={errors.content_ru?.message} label="Содержание на русском" value={value} onChange={(value) => onChange(value)} />} />
                <h3>Редактирование (Казахский)</h3>
                <Input {...register('title_kz', { required })} error={errors.title_kz?.message} label="Название на казахском" />
                <Input {...register('media_kz')} error={errors.media_kz?.message} label="Видео" type='file' />
                <Controller control={control} name={'content_kz'} rules={{ required }} render={({ field: { value, onChange } }) => <JoditEditorComponent error={errors.content_kz?.message} label="Содержание на казахском" value={value} onChange={(value) => onChange(value)} />} />
            </form>

        </SheetContent>
    </Sheet>


}
