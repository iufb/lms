'use client'
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";


import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

export const CreateTest = () => {
    const { control, handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm()
    const onCreate = (data: any) => {
        console.log(data)
    };

    return <form onSubmit={handleSubmit(onCreate)} className="flex flex-col gap-2 px-1 h-full overflow-auto">
        <Label className="text-xl">Tест</Label>
        <CreateQuestion />


    </form>



}

const CreateQuestion = () => {
    return <Sheet>
        <SheetTrigger className="w-full bg-slate-200 border border-slate-300 rounded-sm px-2 py-1 text-gray-500  " >
            <div className="text-sm flex gap-1 items-center">
                <Plus size={14} />
                Добавить вопрос
            </div>
        </SheetTrigger>
        <SheetContent >
            <SheetHeader>
                <SheetTitle>Вопрос</SheetTitle>
                <SheetDescription>
                    Здесь Вы можете добавить вопрос
                </SheetDescription>
            </SheetHeader>
            <form className="px-2 gap-2 flex flex-col h-full pb-2">
                <Tabs defaultValue="RU" className="flex-1 ">
                    <TabsList className="w-1/2 mx-auto">
                        <TabsTrigger value="RU">RU</TabsTrigger>
                        <TabsTrigger value="KZ">KZ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="RU" className="flex flex-col gap-2">
                        <Input label="Вопрос" />
                        <Separator className="my-2" />
                        {Array.from({ length: 4 }).map((_, id) => <div key={id} >
                            <Input label={`Ответ № ${id + 1}`} />
                            <div className="flex items-center gap-3 my-2"><Checkbox id={`${id}`} /><Label htmlFor={`${id}`}>Правильный ответ </Label></div>
                        </div>)}

                    </TabsContent>
                    <TabsContent value="KZ" className="flex flex-col gap-2">
                        <Input label="Вопрос" />
                        <Separator className="my-2" />
                        {Array.from({ length: 4 }).map((_, id) => <div key={id} >
                            <Input label={`Ответ № ${id + 1}`} />
                            <div className="flex items-center gap-3 my-2"><Checkbox id={`${id}`} /><Label htmlFor={`${id}`}>Правильный ответ </Label></div>
                        </div>)}

                    </TabsContent>
                </Tabs>
                <Button className="w-full self-end">Добавить</Button>
            </form>
        </SheetContent>
    </Sheet>

}
