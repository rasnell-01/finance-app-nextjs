import {useFormState} from "react-dom";
import {updateProfile} from "@/lib/actions";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Label from "@/components/label";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";

const initialState = {
    message: '',
    error: false
}

export default function SettingsFormProfile({defaults}) {
    const [profileState, profileAction] = useFormState(updateProfile, initialState);
    return <>
        {/* Profile Section */}
        <form className="space-y-4" action={profileAction}>
            {profileState?.error && <AlertError>{profileState?.message}</AlertError>}
            {!profileState?.error && profileState?.message.length > 0 && <AlertSuccess>{profileState?.message}</AlertSuccess>}

            <Label htmlFor="fullName">User full name</Label>
            <Input type="text" name="fullName" id="fullName" placeholder="full name" defaultValue={defaults?.fullName} required />

            <Label htmlFor="email">User email</Label>
            <Input type="text" name="email" id="email" placeholder="email" defaultValue={defaults?.email} required />

            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="New password" />

            <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm new password" />

            <SubmitButton>Save Profile</SubmitButton>
        </form>
    </>
}
