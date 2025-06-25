import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Label from "@/components/label";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import {useFormState} from "react-dom";
import {updatePreferences} from "@/lib/actions";

const initialState = {
    message: '',
    error: false
}

export default function SettingsFormPreferences({defaults}) {
    const [prefsState, prefsAction] = useFormState(updatePreferences, initialState);
    return <>
        {/* Preferences Section */}
        <form className="space-y-4" action={prefsAction}>
            {prefsState?.error && <AlertError>{prefsState?.message}</AlertError>}
            {!prefsState?.error && prefsState?.message.length > 0 && <AlertSuccess>{prefsState?.message}</AlertSuccess>}

            <Label htmlFor="theme">Theme</Label>
            <select name="theme" id="theme" defaultValue={defaults?.theme} className="input input-bordered w-full">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
            </select>

            <Label htmlFor="currency">Currency</Label>
            <Input type="text" name="currency" id="currency" placeholder="USD, EUR, etc." defaultValue={defaults?.currency} />

            <Label htmlFor="currencySymbol">Currency Symbol</Label>
            <Input type="text" name="currencySymbol" id="currencySymbol" placeholder="$, €, etc." defaultValue={defaults?.currencySymbol} />

            <SubmitButton>Save Preferences</SubmitButton>
        </form>
    </>
}
