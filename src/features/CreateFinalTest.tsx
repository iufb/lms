'use client'
import { HandleQuestion } from "@/features/CreateTest"
import { useFinalTestCreate, useFinalTestUpdate, useGetFinalTestByCourseIdList } from "@/shared/api/generated"
import { deserializeQuestionsAndAnswers, serializeQuestionsAndAnswers } from "@/shared/lib/utils"
import { Answer, Question } from "@/shared/types"
import { Button } from "@/shared/ui/button"
import { Label } from "@/shared/ui/label"
import { useEffect, useState } from "react"
import { toast } from "sonner"
interface CreateFinalTestProps {
    courseId: number
}
export const CreateFinalTest = ({ courseId }: CreateFinalTestProps) => {
    const [questions, setQuestions] = useState<Map<number, Question>>(new Map())
    const [answers, setAnswers] = useState<Map<number, Answer>>(new Map())
    const { mutate: create, isPending } = useFinalTestCreate({
        mutation: {
            onSuccess: () => {
                toast.success('Тест создан')
            }, onError: () => {
                toast.error('Ошибка при создании теста')
            }
        }
    })
    const { mutate: update, isPending: isPendingEdit } = useFinalTestUpdate({
        mutation: {
            onSuccess: () => {
                toast.success('Тест изменен')
            }, onError: () => {
                toast.error('Ошибка при  изменении теста')
            }
        }
    })
    const { data: test } = useGetFinalTestByCourseIdList({ course_id: courseId })
    const onSave = () => {
        const serializedData = serializeQuestionsAndAnswers(questions, answers)
        if (test && test.id) {
            update({ id: test.id, data: { ...serializedData, course: courseId } })
        } else {

            create({ data: { ...serializedData, course: courseId } })
        }

    };

    useEffect(() => {
        if (test) {
            const data = deserializeQuestionsAndAnswers({ answer_kz: test.answer_kz, answer_ru: test.answer_ru, questions_kz: test.questions_kz, questions_ru: test.questions_ru })

            setQuestions(() => {
                setAnswers(data.answers)
                return data.questions
            })

        }
    }, [test])
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
        <div className="flex justify-between mb-4"><Label className="text-xl">Финальный тест</Label><Button className="w-fit" loading={isPending || isPendingEdit} disabled={isPending || isPendingEdit} onClick={onSave}>Сохранить</Button></div>
        <HandleQuestion mode="create" onAddQuestion={onAddQuestion} />
        {Array.from(questions).map(([id, q]) => <div key={id} className="px-4 py-3 border border-slate-300 text-slate-600 rounded-lg bg-slate-200 flex justify-between">
            <span>{id}. {q.qRu}</span>
            <HandleQuestion id={id} mode="edit" answer={answers.get(id)} onEditQuestion={onEditQuestion} defaultValues={q} />
        </div>)}


    </section>


}
