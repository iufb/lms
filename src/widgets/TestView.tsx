'use client'
import { GetCertButton } from "@/features/GetCertButton";
import { FinalTestResultsList200Item, useCheckFinalTestCreate, useCheckTestCreate, useFinalTestResultsList, useGetFinalTestByCourseIdList, useGetLessonTestByLessonIdList } from "@/shared/api/generated";
import { getLocalized } from "@/shared/lib/utils";
import { queryClient } from "@/shared/providers/query.provider";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface TestViewProps {
    mode: 'lesson' | 'final'
    id: number
}
export const TestDialog = ({ mode, id }: TestViewProps) => {
    const t = useTranslations('test.dialog')
    return <Dialog>
        <DialogTrigger className="trigger my-2 w-1/2">{t('title')}</DialogTrigger>
        <DialogContent className="min-w-full  md:min-w-3xl xl:min-w-6xl h-full   md:h-[90%]  block rounded-none  md:rounded-lg overflow-auto">
            <DialogHeader className="h-10">
                <DialogTitle>{t('title')}</DialogTitle>
                <DialogDescription>
                    {t('desc')}
                </DialogDescription>
            </DialogHeader>
            <TestView mode={mode} id={id} />
        </DialogContent>
    </Dialog>
};


type QuestionData = {
    q: string;
    a: string[];
};

const transformQuestions = (questions: Record<string, any>, locale: string): QuestionData[] => {
    return Object.values(questions).map((q: any) => ({
        q: q[`q${locale[0].toUpperCase() + locale.slice(1)}`], // Adjusted locale casing
        a: [q[`1${locale}`], q[`2${locale}`], q[`3${locale}`], q[`4${locale}`]],
    }));
};

type Answers = Map<string, string>

export const TestView = ({ id, mode }: TestViewProps) => {
    const t = useTranslations('test.view')

    const { data: lessonTest, isLoading: isLessonTestLoading } = useGetLessonTestByLessonIdList({ lesson_id: id }, { query: { enabled: mode === 'lesson' } });
    const { data: finalTest, isLoading: isFinalTestLoading } = useGetFinalTestByCourseIdList({ course_id: id }, { query: { enabled: mode === 'final' } });

    const { data: finalTestResult, isLoading: isFinalTestResultsPending, queryKey } = useFinalTestResultsList({ course_id: id }, { query: { enabled: mode === 'final' } });


    const { mutate: checkLessonTest, isPending: checkLessonTestPending } = useCheckTestCreate({
        mutation: {
            onSuccess: (data) => {
                setResult(data.correct)
            }
        }
    })

    const { mutate: checkFinalTest, isPending: checkFinalTestPending } = useCheckFinalTestCreate({
        mutation: {
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey })
                setOpen(true)
            }
        }
    })

    const [loading, setLoading] = useState(false)
    const [questionsState, setQuestions] = useState<QuestionData[]>([])
    const [answers, setAnswers] = useState<Answers>(new Map());
    const [result, setResult] = useState<number>()
    const [open, setOpen] = useState(false)
    const locale = useLocale();

    const selectAnswer = (qId: number, answer: number) => {
        setAnswers(prev => {
            const updated = new Map(prev)
            updated.set(qId.toString(), answer.toString())
            return updated
        })
    }


    useEffect(() => {
        if (lessonTest && lessonTest[0]) {
            setLoading(true)
            const questions = getLocalized(lessonTest[0], 'questions', locale);
            setQuestions(prev => {
                setLoading(false)
                return transformQuestions(questions, locale)
            })
        }
    }, [lessonTest])

    useEffect(() => {
        if (finalTest) {
            setLoading(true)
            const questions = getLocalized(finalTest, 'questions', locale);
            setQuestions(prev => {
                setLoading(false)
                return transformQuestions(questions, locale)
            })
        }
    }, [finalTest])

    const handleCheck = () => {
        console.log(finalTestResult)
        switch (mode) {
            case 'lesson': if (lessonTest && lessonTest[0].id)
                checkLessonTest({ data: { lesson_id: lessonTest[0].id, answers: Object.fromEntries(answers), language: locale } })
            case 'final': if (finalTest) {
                //todoo
                if (finalTestResult && finalTestResult.length >= 2) {
                    toast.error(t('max'))
                    return;
                }
                checkFinalTest({ data: { course_id: id, answers: Object.fromEntries(answers), language: locale } })
            }
        }
    }
    if (loading) return <div className="w-full flex-center h-52"><Loader2 size={48} className="animate-spin text-primary" /></div>
    return <section className="flex flex-col gap-4 min-h-[90%] ">
        {questionsState.map((q, idx) => (
            <Question qId={idx + 1} key={idx} q={q as QuestionData} answers={answers} select={selectAnswer} />
        ))}
        <section className="mt-auto flex flex-col gap-2 w-full">
            {mode == 'lesson' && result !== undefined && <span className="px-3 rounded-lg  py-2 text-center bg-green-300 dark:bg-green-600 border border-green-400  dark:border-green-700">{t('result', { right: result })} / {questionsState.length}</span>
            }
            {(finalTestResult && finalTestResult.length > 0) && mode == 'final' && <FinalResultDialog courseId={id} results={finalTestResult ?? []} qCount={questionsState.length} open={open} setOpen={setOpen} />
            }
            {questionsState.length !== 0 && <Button loading={checkLessonTestPending || checkFinalTestPending} disabled={checkLessonTestPending || checkFinalTestPending || (answers.size < questionsState.length)} onClick={handleCheck} className="w-full justify-self-end">{t('btn')}</Button>}
        </section>
    </section>


};

const Question = ({ qId, q, answers, select }: { qId: number, q: QuestionData, answers: Answers, select: (qId: number, answer: number) => void }) => {
    return (
        <section>
            <h4 className="my-2">{qId}. {q.q}</h4>
            <section className="flex flex-col gap-2">
                {q.a.map((a, id) => {
                    const selected = answers.get(qId.toString()) == id.toString()
                    return <Label key={id}>
                        <Checkbox checked={selected} onCheckedChange={() => select(qId, id)} /> {a}
                    </Label>

                })}
            </section>
        </section>
    );
};

interface FinalResultDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    qCount: number,
    courseId: number,
    results: FinalTestResultsList200Item[]
}
const FinalResultDialog = ({ open, qCount, setOpen, results, courseId }: FinalResultDialogProps) => {
    const bestResult = (results.sort((a, b) => {
        if (!a.score || !b.score) return 1
        return a.score - b.score
    }))[0]

    const t = useTranslations('finaltest.result')
    const resultPersentage = ((bestResult.score ?? 0) * 100) / qCount
    return <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogTrigger className="text-end my-2 text-gray-500">{t('btn')}</DialogTrigger>
        <DialogContent
            onInteractOutside={(e) => {
                e.preventDefault();
            }}
        >
            <DialogHeader>
                <DialogTitle>{t('title')}</DialogTitle>
                <DialogDescription>
                    {t('description')}</DialogDescription>
            </DialogHeader>
            <p>{t('best', { resultPersentage })}</p>
            <span>{t('tries', { tries: results.length })}</span>
            {resultPersentage > 80 && <GetCertButton results={results} courseId={courseId} />}
        </DialogContent>
    </Dialog>
}
