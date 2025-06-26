'use client'
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import {updateDateTimeSettings} from "@/lib/actions";
import {initialState} from "@/lib/consts";
import {useActionState} from "react";

export default function SettingsFormDateTime({defaults}) {
    const [dtState, dtAction] = useActionState(updateDateTimeSettings, initialState);
    return <>
        {/* Date/Time Section */}
        <form className="space-y-4" action={dtAction}>
            {dtState?.error && <AlertError>{dtState?.message}</AlertError>}
            {!dtState?.error && dtState?.message.length > 0 && <AlertSuccess>{dtState?.message}</AlertSuccess>}

            <Label htmlFor="dateFormat">Date Format</Label>
            <select name="dateFormat" id="dateFormat" defaultValue={defaults?.dateFormat} className="input input-bordered w-full">
                <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 06/25/2025)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 25/06/2025)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2025-06-25)</option>
                <option value="MMM D, YYYY">MMM D, YYYY (e.g. Jun 25, 2025)</option>
                <option value="DD MMM YYYY">DD MMM YYYY(e.g. 25 Jun 2025)</option>
            </select>

            <Label htmlFor="timeFormat">Time Format</Label>
            <select name="timeFormat" id="timeFormat" defaultValue={defaults?.timeFormat} className="input input-bordered w-full">
                <option value="12">12-hour</option>
                <option value="24">24-hour</option>
            </select>

            <SubmitButton>Save Date/Time</SubmitButton>
        </form>
    </>
}
