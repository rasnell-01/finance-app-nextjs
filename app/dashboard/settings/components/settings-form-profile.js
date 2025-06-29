'use client'
import {updateProfile} from "@/lib/actions";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Label from "@/components/label";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { initialState } from "@/lib/consts";
import { useActionState } from "react";

export default function SettingsFormProfile({ defaults }) {
    const [profileState = initialState, profileAction] = useActionState(updateProfile, initialState);
    return <>
        {/* Profile Section */}
        <form className="space-y-4" action={profileAction}>
            {profileState?.error && profileState?.message && (
                <AlertError>{profileState.message}</AlertError>
            )}
            {!profileState?.error && profileState?.message && (
                <AlertSuccess>{profileState.message}</AlertSuccess>
            )}

            <Label htmlFor="fullName">User full name</Label>
            <Input type="text" name="fullName" id="fullName" placeholder="full name" defaultValue={defaults?.fullName} required />

            <Label htmlFor="email">User email</Label>
            <Input type="text" name="email" id="email" placeholder="email" defaultValue={defaults?.email} />

            <SubmitButton>Save Profile</SubmitButton>
        </form>
    </>
}
