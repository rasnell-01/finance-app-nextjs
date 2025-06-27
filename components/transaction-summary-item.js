'use client';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { useFormatDate } from '@/hooks/use-format-date';

export default function TransactionSummaryItem({ date, amount, initialSettings }) {
    const { formattedCurrency, loadingCurrency } = useFormatCurrency(amount, initialSettings);
    const { formattedDate, loading: loadingDate, error } = useFormatDate(date, initialSettings);

    if (loadingCurrency || loadingDate) {
        return (
            <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
                <div className="grow">Loading…</div>
                <div className="min-w-[70px] text-right font-semibold"></div>
                <div className="min-w-[50px]"></div>
            </div>
        );
    }

    if (error) {
        console.error('Settings error:', error);
    }

    return (
        <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
            <div className="grow">{formattedDate || 'Invalid Date'}</div>
            <div className="min-w-[70px] text-right font-semibold">{formattedCurrency || 'N/A'}</div>
            <div className="min-w-[50px]"></div>
        </div>
    );
}
