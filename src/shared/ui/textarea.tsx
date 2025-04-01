import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Label } from "@/shared/ui/label"

function Textarea({ className, label, error, ...props }: React.ComponentProps<"textarea"> & { error?: string, label?: string }) {
    return (
        <div>
            <Label className="ml-3 my-1.5" htmlFor={props.id}>{label}</Label>

            <textarea
                data-slot="textarea"
                className={cn(
                    "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className,

                    error && "border border-red-500"
                )}
                {...props}
            />

            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    )
}

export { Textarea }
