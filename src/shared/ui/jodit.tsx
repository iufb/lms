"use client";

import { useMemo } from "react";

import { cn } from "@/shared/lib/utils";
import dynamic from "next/dynamic";
import { Label } from "./label";
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

interface JoditEditorProps {
    value?: string;
    error?: string;
    onChange: (value: string) => void;
    label?: string;
}

const JoditEditorComponent = ({ value, error, onChange, label }: JoditEditorProps) => {
    const config = useMemo(
        () => ({
            readonly: false,
            language: "ru",
            uploader: {
                insertImageAsBase64URI: true,
            },
        }),
        []
    );

    return (
        <div className="flex flex-col gap-2">
            <Label className={cn('ml-1.5', error && 'text-red-500')}>{label}</Label>
            <JoditEditor
                value={value}
                config={config}
                tabIndex={1}
                onChange={(content) => onChange(content)}
                className={cn('h-96', error && "border border-red-500"
                )}
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
};

export default JoditEditorComponent
