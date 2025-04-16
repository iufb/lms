import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/label";


function Input({ className, label, type, error, ...props }: React.ComponentProps<"input"> & { error?: string, label?: string, }) {
    return (
        <div>
            <Label className={cn('ml-2 my-1.5', error && 'text-red-500')} htmlFor={props.id}>{label}</Label>
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className,
                    error && "border border-red-500"
                )}
                {...props}
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    )
}

export { Input };
