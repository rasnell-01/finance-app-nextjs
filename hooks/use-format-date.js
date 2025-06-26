import { useMemo } from "react";
import { useUserSettings } from "@/lib/user-settings";
import { defaultSettings } from "@/lib/defaultSettings";
import { format as formatDateFns } from "date-fns";
import {FORMAT_MAP} from "@/lib/consts";

export function useFormatDate(date, defaultFormat = defaultSettings.dateFormat) {
    const { settings } = useUserSettings();
    const userPattern = settings?.dateFormat || defaultFormat;
    const pattern = FORMAT_MAP[userPattern];
    const d = useMemo(() => (date instanceof Date ? date : new Date(date)), [date]);

    return useMemo(() => {
        if (!(d instanceof Date) || isNaN(d)) return "";
        try {
            return formatDateFns(d, pattern);
        } catch {
            // fallback to ISO string if formatting fails
            return d.toISOString();
        }
    }, [d, pattern]);
}
