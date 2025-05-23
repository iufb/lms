'use client'
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import JoditEditorComponent from "@/shared/ui/jodit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Controller, useForm } from "react-hook-form";

export const LessonForm = () => {
    const { control, handleSubmit,
        register,
    } = useForm()
    const onSubmit = (data: any) => {
        console.log(data)
    };

    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

        <Button className="w-fit self-end">Создать</Button>
        <Tabs defaultValue="RU">
            <TabsList className="w-1/2 mx-auto">
                <TabsTrigger value="RU">RU</TabsTrigger>
                <TabsTrigger value="KZ">KZ</TabsTrigger>
            </TabsList>
            <TabsContent value="RU" className="flex flex-col gap-2">
                <Input {...register('title_ru')} label="Название на русском" />
                <Controller control={control} name={'content_ru'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на русском" value={value} onChange={(value) => onChange(value)} />} />
            </TabsContent>
            <TabsContent value="KZ" className="flex flex-col gap-2">
                <Input {...register('title_kz')} label="Название на казахском" />
                <Controller control={control} name={'content_kz'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на казахском" value={value} onChange={(value) => onChange(value)} />} />

            </TabsContent>
        </Tabs>
    </form>


}
