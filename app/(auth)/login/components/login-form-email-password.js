'use client';
import Input from '@/components/input';
import { loginEmailPassword } from '@/lib/actions';
import SubmitButton from '@/components/submit-button';
import { useActionState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const initialState = {
    message: null,
    error: false,
};

export default function LoginFormEmailPassword() {
    const [state, formAction] = useActionState(loginEmailPassword, initialState);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        if (state.message && !state.error) {
            const timer = setTimeout(() => router.push('/'), 2000); // Redirect after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [state, router]);

    const handleSubmit = (formData) => {
        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <form action={handleSubmit} className="py-4">
            <Input className="p-1 m-px" type="email" placeholder="email@email.com" name="email" required />
            <Input className="p-1 m-px" type="password" placeholder="********" name="password" required />
            <SubmitButton type="submit" size="sm" className="w-full m-px" disabled={isPending}>
                Login
            </SubmitButton>
            <p className={`${state?.error ? 'text-red-500' : 'text-green-500'}`}>
                {state?.message}
            </p>
        </form>
    );
}
