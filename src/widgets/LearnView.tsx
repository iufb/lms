'use client'
import { useLessonRead } from "@/shared/api/generated";
import { getLocalized } from "@/shared/lib/utils";
import { ShowFetchContent } from "@/shared/ui/show-fetch-content";
import { Loader2 } from "lucide-react";

import { useLocale } from "next-intl";
import ReactPlayer from 'react-player/lazy';
interface LearnViewProps {
    lessonId: number
}
export const LearnView = ({ lessonId }: LearnViewProps) => {
    const { data, isLoading, error } = useLessonRead(lessonId)
    const locale = useLocale()
    return <ShowFetchContent
        data={data}
        isLoading={isLoading}
        isError={error}
        loader={<section className="w-full h-52 flex-center"> <Loader2 size={48} className="animate-spin text-primary " /></section>}
        error={<div>erorr</div>}
        content={<section className="stack  gap-5 px-10">
            <h1>{data && getLocalized(data, 'title', locale)}</h1>
            <div className="px-3" dangerouslySetInnerHTML={{ __html: data && getLocalized(data, 'content', locale) }} />
            {data &&
                <div className="relative pt-[56.25%] ">
                    <ReactPlayer
                        url={getLocalized(data, 'media', locale)}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        width="100%"
                        height="100%"
                        controls
                    />
                </div>}        </section>}
    />
};
