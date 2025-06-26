'use client'
import Input from "@/components/input";
import {login} from "@/lib/actions";
import SubmitButton from "@/components/submit-button";
import { useActionState } from "react";


const initialState = {
    message: null,
    error: false,
}

export default function LoginForm(){
    const [state, formAction] = useActionState(login, initialState)
    return <form action={formAction}>
        <Input type="email" placeholder="email@email.com" name="email" required />
        <SubmitButton type="submit" size="sm" className="w-full">
            Login
        </SubmitButton>
        <p className={`${state?.error ? 'text-red-500' : 'text-green-500'}`}>
            {state?.message}
        </p>
    </form>
}
