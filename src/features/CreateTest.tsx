'use client'
import { useLessonTestCreate } from "@/shared/api/generated";
import { cn, required } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";

import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Plus, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const CreateTest = () => {
    const [questions, setQuestions] = useState<Map<number, Question>>(new Map())
    const [answers, setAnswers] = useState<Map<number, Answer>>(new Map())
    const { mutate, isPending } = useLessonTestCreate({ mutation: { onSuccess: () => { }, onError: () => { } } })
    const onSave = () => {
        const questions_ru: Record<number, Pick<Question, 'qRu' | '1ru' | '2ru' | '3ru' | '4ru'>> = {};
        const questions_kz: Record<number, Pick<Question, 'qKz' | '1kz' | '2kz' | '3kz' | '4kz'>> = {};

        for (const [key, q] of questions.entries()) {
            questions_ru[key] = {
                qRu: q.qRu,
                '1ru': q['1ru'],
                '2ru': q['2ru'],
                '3ru': q['3ru'],
                '4ru': q['4ru'],
            };

            questions_kz[key] = {
                qKz: q.qKz,
                '1kz': q['1kz'],
                '2kz': q['2kz'],
                '3kz': q['3kz'],
                '4kz': q['4kz'],
            };
        }

        const answer_ru: Record<number, number | null> = {};
        const answer_kz: Record<number, number | null> = {};

        for (const [id, a] of answers) {
            answer_ru[id] = a.ru;
            answer_kz[id] = a.kz;
        }
        mutate({ data: { answer_ru, answer_kz, lesson: 1, questions_ru, questions_kz } })
    };
    console.log(answers)

    const onAddQuestion = (question: Question, answer: Answer) => {
        setQuestions(q => {
            const updated = new Map(q)
            const order = q.size + 1
            setAnswers(a => {
                const updated = new Map(a)
                updated.set(order, answer)
                return updated
            })
            updated.set(order, question)
            return updated
        }
        )
    }
    const onEditQuestion = (id: number, question: Question, answer: Answer) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = new Map(prevQuestions);

            updatedQuestions.set(id, question);

            return updatedQuestions;
        });

        setAnswers((prevAnswers) => {
            const updatedAnswers = new Map(prevAnswers);

            updatedAnswers.set(id, answer);

            return updatedAnswers;
        });
    }




    return <section className="flex flex-col gap-2 px-1 h-full overflow-auto">
        <div className="flex justify-between mb-4"><Label className="text-xl">Tест</Label><Button onClick={onSave}>Сохранить</Button></div>

        <HandleQuestion mode="create" onAddQuestion={onAddQuestion} />
        {Array.from(questions).map(([id, q]) => <div key={id} className="px-4 py-3 border border-slate-300 text-slate-600 rounded-lg bg-slate-200 flex justify-between">
            <span>{id}. {q.qRu}</span>
            <HandleQuestion id={id} mode="edit" onEditQuestion={onEditQuestion} defaultValues={q} />
        </div>)}


    </section>



}
type Question = {
    qRu: string,
    qKz: string,
    '1ru': string,
    '2ru': string,
    '3ru': string,
    '4ru': string,
    '1kz': string,
    '2kz': string,
    '3kz': string,
    '4kz': string,

}
type Answer = {
    ru: number | null, kz: number | null
}

interface HandleQuestionProps {
    mode: 'create' | 'edit',
    defaultValues?: Question,
    id?: number,
    onAddQuestion?: (q: Question, a: Answer) => void
    onEditQuestion?: (id: number, q: Question, a: Answer) => void
}

const HandleQuestion = ({ id, mode, defaultValues, onAddQuestion, onEditQuestion }: HandleQuestionProps) => {
    const [open, setOpen] = useState(false)
    const { control, handleSubmit,
        register,
        watch,
        getValues,
        reset,
        formState: { errors },
    } = useForm<Question>({
        defaultValues: defaultValues ? defaultValues : {
            qRu: "Вопрос на русском",  // Example question in Russian
            qKz: "Сұрақ қазақ тілінде",  // Example question in Kazakh
            '1ru': "Ответ 1 на русском",  // Option 1 in Russian
            '2ru': "Ответ 2 на русском",  // Option 2 in Russian
            '3ru': "Ответ 3 на русском",  // Option 3 in Russian
            '4ru': "Ответ 4 на русском",  // Option 4 in Russian
            '1kz': "Жауап 1 қазақша",  // Option 1 in Kazakh
            '2kz': "Жауап 2 қазақша",  // Option 2 in Kazakh
            '3kz': "Жауап 3 қазақша",  // Option 3 in Kazakh
            '4kz': "Жауап 4 қазақша",  // Option 4 in Kazakh
        }
    })
    // const [rightAnswer, setRightAnswer] = useState<Answer>({ ru: null, kz: null })
    const [rightAnswer, setRightAnswer] = useState<Answer>({ ru: 1, kz: 1 })
    const toggle = (checked: CheckedState, id: number, lang: 'ru' | 'kz') => {
        if (checked) {
            chooseRightAnswer(id, lang)
        } else {
            chooseRightAnswer(null, lang)
        }
    }
    const chooseRightAnswer = (id: number | null, lang: 'ru' | 'kz') => {
        setRightAnswer({ ...rightAnswer, [lang]: id })
    }

    const onSubmit: SubmitHandler<Question> = (data) => {
        if (rightAnswer.ru == null || rightAnswer.kz == null) {
            toast.error('Вы не указали правильные ответы')
            return;
        }
        if (onAddQuestion) {
            console.log(rightAnswer, 'RIGHT ANSWER')
            onAddQuestion(data, rightAnswer)
            reset()

        }
        if (onEditQuestion && id) {
            onEditQuestion(id, data, rightAnswer)
        }
        setOpen(false)
    }

    return <Sheet open={open} onOpenChange={open => setOpen(open)}>
        <SheetTrigger className={cn({ create: "w-full bg-slate-200 border border-slate-300 rounded-sm px-2 py-1 text-gray-500", edit: "" }[mode])}>
            {mode == 'create' && <div className="text-sm flex gap-1 items-center">
                <Plus size={14} />
                Добавить вопрос
            </div>}
            {mode == 'edit' && <SettingsIcon />}
        </SheetTrigger>
        <SheetContent className="min-w-[60vw]">
            <SheetHeader>
                <SheetTitle>Вопрос</SheetTitle>
                <SheetDescription>
                    Здесь Вы можете {mode == 'create' ? 'добавить' : 'изменить'} вопрос
                </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="px-2 gap-2 flex flex-col h-full pb-2 overflow-auto">

                <Button className="w-fit self-end">{mode == 'create' ? 'Добавить' : "Изменить"}</Button>
                <Input {...register('qRu', { required })} error={errors.qRu?.message} label="Вопрос (Русский)" />
                <Separator className="my-2" />
                {Array.from({ length: 4 }).map((_, id) => <div key={id} className="bg-slate-100 px-2 py-1 rounded-sm ml-2 border-slate-200 border" >
                    <Input {...register(`${id + 1}ru` as keyof Question, { required })} error={errors[`${id + 1}Ru` as keyof Question]?.message} label={`Ответ № ${id + 1} (Русский)`} />
                    <div className="flex items-center gap-3 my-2"><Checkbox checked={rightAnswer.ru == id} onCheckedChange={checked => toggle(checked, id, 'ru')} id={`ru ${id}`} /><Label htmlFor={`ru ${id}`}>Правильный ответ </Label>
                    </div>

                </div>)}

                <Separator className="my-2" />
                <Input {...register('qKz', { required })} error={errors.qKz?.message} label="Вопрос (Казахский)" />
                <Separator className="my-2" />
                {Array.from({ length: 4 }).map((_, id) => <div key={id} className="bg-slate-100 px-2 py-1 rounded-sm ml-2 border border-slate-200" >
                    <Input {...register(`${id + 1}kz` as keyof Question, { required })} error={errors[`${id + 1}Kz` as keyof Question]?.message} label={`Ответ № ${id + 1} (Казахский)`} />
                    <div className="flex items-center gap-3 my-2"><Checkbox checked={rightAnswer.kz == id} onCheckedChange={checked => toggle(checked, id, 'kz')} id={`kz ${id}`} /><Label htmlFor={`kz ${id}`}>Правильный ответ </Label></div>
                </div>)}

            </form>
        </SheetContent>
    </Sheet>

}
