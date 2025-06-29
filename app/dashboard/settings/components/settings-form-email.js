'use client';
import { initialState } from '@/lib/consts';
import { useActionState, useTransition } from 'react';
import { updateEmail } from '@/lib/actions';
import AlertError from '@/components/alert-error';
import AlertSuccess from '@/components/alert-success';
import Label from '@/components/label';
import Input from '@/components/input';
import SubmitButton from '@/components/submit-button';

export default function SettingsFormEmail({ defaults }) {
    const [emailState = initialState, emailAction] = useActionState(updateEmail, initialState);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData) => {
        startTransition(() => {
            emailAction(formData);
        });
    };

    return (
        <>
            {/* Email Section */}
            <form className="space-y-4" action={handleSubmit}>
                {emailState?.error && emailState?.message && <AlertError>{emailState.message}</AlertError>}
                {!emailState?.error && emailState?.message && <AlertSuccess>{emailState.message}</AlertSuccess>}

                <Label htmlFor="new_email">New Email</Label>
                <Input
                    type="email"
                    name="new_email"
                    id="new_email"
                    placeholder="newemail@example.com"
                    defaultValue={defaults?.email || ''}
                    required
                />

                <Label htmlFor="password">Current Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter current password"
                    required
                />

                <SubmitButton type="submit"{...(isPending ? { loading: 'true' } : {})}>
                    Update Email
                </SubmitButton>
            </form>
        </>
    );
}
