'use client'

import { ErrorType } from "@/shared/api/custom-instance";
import { CourseLessonsList200Item, useCourseLessonsList, useUserCoursesList } from "@/shared/api/generated";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type LearnContextType = {
    lessons: CourseLessonsList200Item[] | undefined,
    lesson: CourseLessonsList200Item | null,
    isLessonsLoading: boolean
    lessonsError: ErrorType<void> | null
    progress: Progress

}

type Progress = { next: number | null, current: number | null }


const LearnContext = createContext<LearnContextType>({ lesson: null, lessons: undefined, isLessonsLoading: false, lessonsError: null, progress: { next: null, current: null } })

export const LearnContextProvider = ({ children, courseId }: { children: ReactNode, courseId: number }) => {
    const searchParams = useSearchParams()
    const uc = searchParams.get('uc')
    const l = searchParams.get('l')

    const [lesson, setLesson] = useState<CourseLessonsList200Item | null>(null)
    const [progress, setProgress] = useState<Progress>({ next: null, current: null })



    const { data: courseLessonsList, isLoading: isLessonsLoading, error } = useCourseLessonsList({ course_id: courseId })
    const { data: userCourses } = useUserCoursesList()

    useEffect(() => {
        if (courseLessonsList && l) {
            const lesson = courseLessonsList.find(c => c.order_num == +l)
            if (lesson) {
                setLesson(lesson)
            }
        }

    }, [courseLessonsList, l])

    useEffect(() => {
        if (userCourses) {
            const selectedCourse = userCourses.find(c => c.course == courseId)

            if (!selectedCourse) {
                setProgress({ current: null, next: null })
                return
            }

            const current = getCurrent(selectedCourse.last_lesson)
            const next = getNextLesson(current)
            console.log(courseLessonsList, 'list')
            console.log(next, 'enxt')
            setProgress({ current, next })
        }

    }, [userCourses, courseLessonsList])

    const getCurrent = (last?: number) => {
        if (!last || last == 0) return 1
        return last
    }
    const getNextLesson = (
        currentOrderNum: number | null
    ): number | null => {
        if (!courseLessonsList || courseLessonsList.length === 0 || currentOrderNum == null) return null

        //@ts-ignore
        const sorted = [...courseLessonsList].sort((a, b) => a.order_num - b.order_num);
        const currentIndex = sorted.findIndex(l => l.order_num === currentOrderNum);

        if (currentIndex !== -1 && currentIndex + 1 < sorted.length) {
            return sorted[currentIndex + 1].order_num as number
        }
        return null
    }




    return <LearnContext.Provider value={{ lesson, lessons: courseLessonsList, isLessonsLoading, lessonsError: error, progress }}>{children}</LearnContext.Provider>
}

export const useLearn = () => {
    return useContext(LearnContext)
}
