import { LessonTestAnswerKz, LessonTestQuestionsKz } from "@/shared/api/generated";
import { LessonTestAnswerRu, LessonTestQuestionsRu } from "@/shared/api/generated1";

export type deserializeQuestionsAndAnswersInput = {
    questions_ru: LessonTestQuestionsRu,
    questions_kz: LessonTestQuestionsKz
    answer_ru: LessonTestAnswerRu,
    answer_kz: LessonTestAnswerKz
}
export type Question = {
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
export type Answer = {
    ru: string | null, kz: string | null
}
export type presignedUrlResponse = {
    "upload_url": string
    "file_key": string
}

interface Course {
    id: number;
    title_ru: string;
    title_kz: string;
    description_ru: string;
    description_kz: string;
    price: number;
    is_published: boolean;
}

interface UserCourse {
    id: number;
    user: number; // User ID
    course: number; // Course ID
    has_access: boolean;
    enrolled_at: string; // ISO Date
}

interface Lesson {
    id: number;
    title_ru: string;
    title_kz: string;
    content_ru: string;
    content_kz: string;
    media_ru?: string | null;
    media_kz?: string | null;
    order_num: number;
}

interface LessonTest {
    id: number;
    lesson: number; // Lesson ID
    questions_ru: object[];
    questions_kz: object[];
    answer_ru: object[];
    answer_kz: object[];
    created_at: string; // ISO Date
}

interface LessonTestResult {
    id: number;
    user: number; // User ID
    lesson_test: number; // LessonTest ID
    answer: object[];
    score: number;
    language: string;
    created_at: string; // ISO Date
}

interface FinalTest {
    id: number;
    course: number; // Course ID
    questions_ru: object[];
    questions_kz: object[];
    answer_ru: object[];
    answer_kz: object[];
    created_at: string; // ISO Date
}

interface FinalTestResult {
    id: number;
    user: number; // User ID
    course: number; // Course ID
    answer: object[];
    score: number;
    language: string;
    created_at: string; // ISO Date
}

interface Certificate {
    id: number;
    user: number; // User ID
    course: number; // Course ID
    issued_at: string; // ISO Date
}

interface Payment {
    id: number;
    user: number; // User ID
    course: number; // Course ID
    amount: number;
    status: "pending" | "completed" | "failed"; // Enum-like behavior
    created_at: string; // ISO Date
}

