'use client'
import SubmitButton from "@/components/submit-button";
import Label from "@/components/label";
import Input from "@/components/input";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import { updateCalendarSettings } from "@/lib/actions";
import {initialState} from "@/lib/consts";
import {useActionState} from "react";

export default function SettingsFormCalendar({ defaults }) {
    const [calendarState, calendarAction] = useActionState(updateCalendarSettings, initialState);

    return (
        <>
            <hr className="my-8" />
            <h2 className="text-xl font-semibold mb-2">Calendar Display Settings</h2>
            <form className="space-y-4" action={calendarAction}>
                {calendarState?.error && <AlertError>{calendarState?.message}</AlertError>}
                {!calendarState?.error && calendarState?.message.length > 0 && <AlertSuccess>{calendarState?.message}</AlertSuccess>}

                <Label htmlFor="showWeekNumbers">Show Week Numbers</Label>
                <Input type="checkbox" name="showWeekNumbers" id="showWeekNumbers" defaultChecked={defaults?.showWeekNumbers} />

                <Label htmlFor="showWeekends">Show Weekends</Label>
                <Input type="checkbox" name="showWeekends" id="showWeekends" defaultChecked={defaults?.showWeekends} />

                <Label htmlFor="showToday">Show Today</Label>
                <Input type="checkbox" name="showToday" id="showToday" defaultChecked={defaults?.showToday} />

                <Label htmlFor="showWeek">Show Week</Label>
                <Input type="checkbox" name="showWeek" id="showWeek" defaultChecked={defaults?.showWeek} />

                <Label htmlFor="showMonth">Show Month</Label>
                <Input type="checkbox" name="showMonth" id="showMonth" defaultChecked={defaults?.showMonth} />

                <Label htmlFor="showYear">Show Year</Label>
                <Input type="checkbox" name="showYear" id="showYear" defaultChecked={defaults?.showYear} />

                <Label htmlFor="showQuarter">Show Quarter</Label>
                <Input type="checkbox" name="showQuarter" id="showQuarter" defaultChecked={defaults?.showQuarter} />

                <Label htmlFor="showDecade">Show Decade</Label>
                <Input type="checkbox" name="showDecade" id="showDecade" defaultChecked={defaults?.showDecade} />

                <Label htmlFor="showCentury">Show Century</Label>
                <Input type="checkbox" name="showCentury" id="showCentury" defaultChecked={defaults?.showCentury} />

                <SubmitButton>Save Calendar Display</SubmitButton>
            </form>
        </>
    );
}
