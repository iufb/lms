'use client'
import { Button } from "@/shared/ui/button";
import axios from "axios";
import React, { useState } from "react";

const getPresignedUrl = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("https://s52.foxminded.space/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const TEst = () => {
    const [file, setFile] = useState<File | null>(null);

    const send = async () => {
        if (!file) return;

        try {
            const url = await getPresignedUrl(file);
            console.log(url)
            await axios.put(url, file, {
                headers: {
                    "Content-Type": file.type,
                },
            });
            alert("Upload successful!");
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile || null);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <Button type="button" onClick={send}>Send</Button>
        </div>
    );
};
