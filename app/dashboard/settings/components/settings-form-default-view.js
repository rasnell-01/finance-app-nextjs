'use client'
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Label from "@/components/label";
import DateRangeSelect from "@/components/date-range-select";
import SubmitButton from "@/components/submit-button";
import {updateDefaultView} from "@/lib/actions";
import {initialState} from "@/lib/consts";
import {useActionState} from "react";

export default function SettingsFormDefaultView({defaults}) {
    const [defaultViewState, defaultViewAction] = useActionState(updateDefaultView, initialState);
    return <>
        {/* Default transactions view */}
        <form className="space-y-4" action={defaultViewAction}>
            {defaultViewState?.error && <AlertError>{defaultViewState?.message}</AlertError>}
            {!defaultViewState?.error && defaultViewState?.message.length > 0 && <AlertSuccess>{defaultViewState?.message}</AlertSuccess>}

            <Label htmlFor='defaultView'>Default transactions view</Label>
            <DateRangeSelect name="defaultView" id="defaultView" defaultValue={defaults?.defaultView} />
            <SubmitButton>Save Default View</SubmitButton>
        </form>
    </>
}
