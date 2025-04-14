import { useEffect, useState } from "react";
interface useChangesProps {
    watched: Record<any, any>,
    initial: Record<any, any>,
}
export const useChanged = ({ watched, initial }: useChangesProps) => {
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        const normalizeToString = (obj: {}) =>
            JSON.parse(
                JSON.stringify(obj, (_, value) =>
                    value !== null && typeof value === 'object'
                        ? value
                        : String(value)
                )
            );
        setIsChanged(!(JSON.stringify(normalizeToString(watched)) === JSON.stringify(normalizeToString(initial))))
    }, [watched, initial])
    return { isChanged }
}
