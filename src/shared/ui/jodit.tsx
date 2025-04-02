"use client";
import JoditEditor from "jodit-react";
import { useMemo } from "react";

import { Label } from "./label";

interface JoditEditorProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
}

export const JoditEditorComponent = ({ value, onChange, label }: JoditEditorProps) => {
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
            <Label className="ml-1.5">{label}</Label>
            <JoditEditor
                value={value}
                config={config}
                tabIndex={1}
                onChange={(content) => onChange(content)}
                className="h-96"
            />
        </div>
    );
};

