'use client'
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { JoditEditorComponent } from "@/shared/ui/jodit";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Controller, useForm } from "react-hook-form";

export const CreateLesson = () => {
    const { control, handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm()
    const onCreate = (data: any) => {
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
                    Здесь Вы можете создать урок для курса
                </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-2 px-1 h-full overflow-auto">

                <Button className="w-fit self-end">Создать</Button>
                <Tabs defaultValue="RU" className="flex-1 ">
                    <TabsList className="w-1/2 mx-auto">
                        <TabsTrigger value="RU">RU</TabsTrigger>
                        <TabsTrigger value="KZ">KZ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="RU" className="flex flex-col gap-2">

                        <Input {...register('title_ru')} label="Название на русском" />
                        <Input {...register('media_ru')} label="Видео" type='file' />
                        <Controller control={control} name={'content_ru'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на русском" value={value} onChange={(value) => onChange(value)} />} />
                    </TabsContent>
                    <TabsContent value="KZ" className="flex flex-col gap-2">
                        <Input {...register('title_kz')} label="Название на казахском" />
                        <Input {...register('media_kz')} label="Видео" type='file' />
                        <Controller control={control} name={'content_kz'} render={({ field: { value, onChange } }) => <JoditEditorComponent label="Содержание на казахском" value={value} onChange={(value) => onChange(value)} />} />

                    </TabsContent>
                </Tabs>
            </form>

        </SheetContent>
    </Sheet>


}
