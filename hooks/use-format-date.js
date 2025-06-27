import { useMemo } from 'react';
import { format } from 'date-fns';
import { useUserSettingsFromSupabase } from '@/lib/userSettingsFromSupabase';

const FORMAT_MAP = {
    'MM/DD/YYYY': 'MM/dd/yyyy',
    'DD/MM/YYYY': 'dd/MM/yyyy',
    'YYYY-MM-DD': 'yyyy-MM-dd',
    'MMM D, YYYY': 'MMM d, yyyy',
    'DD MMM YYYY': 'dd MMM yyyy',
};

const DEFAULT_FORMAT = 'MM/dd/yyyy';

export function useFormatDate(date, initialSettings = null) {
    const { settings, loading, error } = useUserSettingsFromSupabase(initialSettings);
    const userPattern = settings?.dateFormat;
    const pattern = FORMAT_MAP[userPattern] || DEFAULT_FORMAT;

    if (!userPattern && !loading) {
        console.warn('No dateFormat in settings, using default:', DEFAULT_FORMAT);
    }
    console.log('Settings:', settings, 'User pattern:', userPattern, 'Selected pattern:', pattern);

    const parsedDate = useMemo(() => {
        if (!date) return null;
        if (date instanceof Date) return date;
        const parsed = new Date(date);
        return isNaN(parsed.getTime()) ? null : parsed;
    }, [date]);

    const formattedDate = useMemo(() => {
        if (!parsedDate) return '';
        console.log('Formatting date:', parsedDate, 'with pattern:', pattern);
        return format(parsedDate, pattern);
    }, [parsedDate, pattern]);

    return { formattedDate, loading, error };
}
