'use client';
import { initialState } from '@/lib/consts';
import { useActionState, useTransition } from 'react';
import { updatePassword } from '@/lib/actions';
import AlertError from '@/components/alert-error';
import AlertSuccess from '@/components/alert-success';
import Label from '@/components/label';
import Input from '@/components/input';
import SubmitButton from '@/components/submit-button';

export default function SettingsFormPassword({ defaults }) {
    const [profileState = initialState, profileAction] = useActionState(updatePassword, initialState);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData) => {
        startTransition(() => {
            profileAction(formData); // Trigger the action
        });
    };

    return (
        <>
            {/* Password Section */}
            <form className="space-y-4" action={handleSubmit}>
                {profileState?.error && profileState?.message && (
                    <AlertError>{profileState.message}</AlertError>
                )}
                {!profileState?.error && profileState?.message && (
                    <AlertSuccess>{profileState.message}</AlertSuccess>
                )}

                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="New password"
                       defaultValue={defaults?.password || ''} minLength={8} required/>

                <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm new password"
                    defaultValue={defaults?.password_confirmation || ''} minLength={8} required/>
                <SubmitButton type="submit" {...(isPending ? { loading: 'true' } : {})}>
                    Save Password
                </SubmitButton>
            </form>
        </>
    );
}
