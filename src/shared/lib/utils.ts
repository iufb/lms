import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const required = 'Обязательное поле'
export async function uploadToS3(url: string, file: File): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                // 'Content-Type': file.type,
            },
        });

        return response.ok; // `true` if upload was successful, `false` otherwise
    } catch {
        return false; // Any network error will return `false`
    }
}


