'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DateRangeSelect from "@/components/date-range-select";
import { useUserSettingsFromSupabase } from "@/lib/userSettingsFromSupabase";

export default function Range() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const { settings } = useUserSettingsFromSupabase();
    const userDefault = settings?.defaultView || 'last30days';

    const range = searchParams.get('range') ?? userDefault;

    const handleChange = (e) => {
        const params = new URLSearchParams()
        params.set('range', e.target.value)
        replace(`${pathname}?${params.toString()}`)
    }

    return <DateRangeSelect value={range} onChange={handleChange}/>
}
