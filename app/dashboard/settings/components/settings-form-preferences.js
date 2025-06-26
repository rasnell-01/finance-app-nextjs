'use client'
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Label from "@/components/label";
import SubmitButton from "@/components/submit-button";
import Select from "@/components/select";
import {updatePreferences} from "@/lib/actions";
import {initialState} from "@/lib/consts";
import {themeColors, CURRENCY_SYMBOLS} from "@/lib/consts";
import {useActionState} from "react";

export default function SettingsFormPreferences({defaults}) {
    const [prefsState = initialState, prefsAction,] = useActionState(updatePreferences, initialState);
    return <>
        {/* Preferences Section */}
        <form className="space-y-4" action={prefsAction}>
            {prefsState?.error && prefsState?.message && (
                <AlertError>{prefsState.message}</AlertError>
            )}
            {!prefsState?.error && prefsState?.message && (
                <AlertSuccess>{prefsState.message}</AlertSuccess>
            )}
            <Label htmlFor="theme">Theme</Label>
            <Select name="theme" id="theme" defaultValue={defaults?.theme}>
                {Object.entries(themeColors).map(([value, label]) => (
                    <option key={value} value={value}>{label.charAt(0).toUpperCase() + label.slice(1)}</option>
                ))}
            </Select>

            <Label htmlFor="currency">Currency</Label>
            <Select name="currency" id="currency" defaultValue={defaults?.currency}>
              {CURRENCY_SYMBOLS.map(cur => (
                <option key={cur.code} value={cur.code}>
                  {cur.symbol} – {cur.label}
                </option>
              ))}
            </Select>

            <SubmitButton>Save Preferences</SubmitButton>
        </form>
    </>
}
