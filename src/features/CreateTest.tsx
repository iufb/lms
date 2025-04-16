'use client'
import { useGetLessonTestByLessonIdList, useLessonTestCreate, useLessonTestUpdate } from "@/shared/api/generated";
import { cn, deserializeQuestionsAndAnswers, required, serializeQuestionsAndAnswers } from "@/shared/lib/utils";
import { Answer, Question } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";

import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Plus, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
interface CreateTestProps {
    lessonId: number
}
export const CreateTest = ({ lessonId }: CreateTestProps) => {
    const [questions, setQuestions] = useState<Map<number, Question>>(new Map())
    const [answers, setAnswers] = useState<Map<number, Answer>>(new Map())
    const { mutate: create, isPending } = useLessonTestCreate({
        mutation: {
            onSuccess: () => {
                toast.success('Тест создан')
            }, onError: () => {
                toast.error('Ошибка при создании теста')
            }
        }
    })
    const { mutate: update, isPending: isPendingEdit } = useLessonTestUpdate({
        mutation: {
            onSuccess: () => {
                toast.success('Тест изменен')
            }, onError: () => {
                toast.error('Ошибка при  изменении теста')
            }
        }
    })
    const { data: testList } = useGetLessonTestByLessonIdList({ lesson_id: lessonId })
    const onSave = () => {
        const serializedData = serializeQuestionsAndAnswers(questions, answers)
        if (testList && testList[0].id) {
            update({ id: testList[0].id, data: { ...serializedData, lesson: lessonId } })
        } else {
            create({ data: { ...serializedData, lesson: lessonId } })
        }

    };

    useEffect(() => {
        if (testList && testList[0]) {

            const t = testList[0]
            const data = deserializeQuestionsAndAnswers({ answer_kz: t.answer_kz, answer_ru: t.answer_ru, questions_kz: t.questions_kz, questions_ru: t.questions_ru })

            setQuestions(() => {
                setAnswers(data.answers)
                return data.questions
            })

        }
    }, [testList])
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
        <div className="flex justify-between mb-4"><Label className="text-xl">Tест</Label><Button className="w-fit" loading={isPending || isPendingEdit} disabled={isPending || isPendingEdit} onClick={onSave}>Сохранить</Button></div>

        <HandleQuestion mode="create" onAddQuestion={onAddQuestion} />
        {Array.from(questions).map(([id, q]) => <div key={id} className="px-4 py-3 border border-slate-300 text-slate-600 rounded-lg bg-slate-200 flex justify-between">
            <span>{id}. {q.qRu}</span>
            <HandleQuestion id={id} mode="edit" answer={answers.get(id)} onEditQuestion={onEditQuestion} defaultValues={q} />
        </div>)}


    </section>



}


interface HandleQuestionProps {
    mode: 'create' | 'edit',
    defaultValues?: Question,
    answer?: Answer,
    id?: number,
    onAddQuestion?: (q: Question, a: Answer) => void
    onEditQuestion?: (id: number, q: Question, a: Answer) => void
}

export const HandleQuestion = ({ id, mode, defaultValues, answer, onAddQuestion, onEditQuestion }: HandleQuestionProps) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<Question>({
        defaultValues: defaultValues ? defaultValues : undefined
    })
    const [rightAnswer, setRightAnswer] = useState<Answer>(answer ? answer : { ru: null, kz: null })
    const toggle = (checked: CheckedState, id: string, lang: 'ru' | 'kz') => {
        if (checked) {
            chooseRightAnswer(id, lang)
        } else {
            chooseRightAnswer(null, lang)
        }
    }
    const chooseRightAnswer = (id: string | null, lang: 'ru' | 'kz') => {
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
                    <div className="flex items-center gap-3 my-2"><Checkbox checked={rightAnswer.ru === id.toString()} onCheckedChange={checked => toggle(checked, id.toString(), 'ru')} id={`ru ${id}`} /><Label htmlFor={`ru ${id}`}>Правильный ответ </Label>
                    </div>

                </div>)}

                <Separator className="my-2" />
                <Input {...register('qKz', { required })} error={errors.qKz?.message} label="Вопрос (Казахский)" />
                <Separator className="my-2" />
                {Array.from({ length: 4 }).map((_, id) => <div key={id} className="bg-slate-100 px-2 py-1 rounded-sm ml-2 border border-slate-200" >
                    <Input {...register(`${id + 1}kz` as keyof Question, { required })} error={errors[`${id + 1}Kz` as keyof Question]?.message} label={`Ответ № ${id + 1} (Казахский)`} />
                    <div className="flex items-center gap-3 my-2"><Checkbox checked={rightAnswer.kz === id.toString()} onCheckedChange={checked => toggle(checked, id.toString(), 'kz')} id={`kz ${id}`} /><Label htmlFor={`kz ${id}`}>Правильный ответ </Label></div>
                </div>)}

            </form>
        </SheetContent>
    </Sheet>

}
