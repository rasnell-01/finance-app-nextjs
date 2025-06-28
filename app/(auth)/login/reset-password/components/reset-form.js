'use client';
import Input from '@/components/input';
import { resetPassword } from '@/lib/actions';
import SubmitButton from '@/components/submit-button';
import { useActionState } from 'react';

const initialState = {
    message: null,
    error: false,
};

export default function ResetForm() {
    const [state, formAction] = useActionState(resetPassword, initialState);
    return (
        <form action={formAction} className="py-4 space-y-4">
            <Input
                className="p-1 mb-2 w-full border rounded"
                type="email"
                placeholder="email@email.com"
                name="email"
                required
            />
            <SubmitButton type="submit" size="sm" className="w-full">
                Reset Password
            </SubmitButton>
            {state.message && (
                <p className={state.error ? 'text-red-500' : 'text-green-500 text-center'}>
                    {state.message}
                </p>
            )}
        </form>
    );
}
