import { Answer, deserializeQuestionsAndAnswersInput, Question } from "@/shared/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function serializeQuestionsAndAnswers(
    questions: Map<number, Question>,
    answers: Map<number, Answer>,
) {
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

    const answer_ru: Record<number, string | null> = {};
    const answer_kz: Record<number, string | null> = {};

    for (const [id, a] of answers.entries()) {
        answer_ru[id] = a.ru;
        answer_kz[id] = a.kz;
    }
    return {
        questions_ru,
        questions_kz,
        answer_ru,
        answer_kz,

    };
}

export function deserializeQuestionsAndAnswers(input: deserializeQuestionsAndAnswersInput) {
    const questions = new Map<number, Question>();
    const answers = new Map<number, { ru: string | null; kz: string | null }>();

    for (const key in input.questions_ru) {
        const id = Number(key);
        const ru = input.questions_ru[id] as Pick<Question, 'qRu' | '1ru' | '2ru' | '3ru' | '4ru'>;
        const kz = input.questions_kz[id] as Pick<Question, 'qKz' | '1kz' | '2kz' | '3kz' | '4kz'>;

        questions.set(id, {
            qRu: ru.qRu,
            '1ru': ru['1ru'],
            '2ru': ru['2ru'],
            '3ru': ru['3ru'],
            '4ru': ru['4ru'],
            qKz: kz.qKz,
            '1kz': kz['1kz'],
            '2kz': kz['2kz'],
            '3kz': kz['3kz'],
            '4kz': kz['4kz'],
        });
    }

    for (const key in input.answer_ru) {
        const id = Number(key);
        answers.set(id, {
            ru: input.answer_ru[id] as string | null,
            kz: input.answer_kz[id] as string | null,
        });
    }

    return { questions, answers };
}

export const required = 'Обязательное поле'
export async function uploadToS3(url: string, file: File): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        return response.ok; // `true` if upload was successful, `false` otherwise
    } catch {
        return false; // Any network error will return `false`
    }
}

export function getLocalized<T extends Record<string, any>>(obj: T, key: string, locale: string) {
    return obj[`${key}_${locale}`] ?? obj[`${key}_ru`]; // fallback to Russian
}
