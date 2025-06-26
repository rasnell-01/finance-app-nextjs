import { useMemo } from "react";
import { useUserSettings } from "@/lib/user-settings";
import { defaultSettings } from "@/lib/defaultSettings";
import { format as formatDateFns } from "date-fns";

// Mapping for user-friendly formats to date-fns patterns
const FORMAT_MAP = {
    "MM/DD/YYYY": "MM/dd/yyyy",
    "DD/MM/YYYY": "dd/MM/yyyy",
    "YYYY-MM-DD": "yyyy-MM-dd",
    "MMM D, YYYY": "MMM d, yyyy",
    "DD MMM YYYY": "dd MMM yyyy",
};

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
