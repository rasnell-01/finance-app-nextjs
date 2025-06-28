'use client'
import Input from "@/components/input";
import {loginOTP} from "@/lib/actions";
import SubmitButton from "@/components/submit-button";
import { useActionState } from "react";


const initialState = {
    message: null,
    error: false,
}

export default function LoginFormOTP(){
    const [state, formAction] = useActionState(loginOTP, initialState)
    return <form action={formAction} className="py-4">
        <Input className="p-1 m-px" type="email" placeholder="email@email.com" name="email" required />
        <SubmitButton type="submit" size="sm" className="w-full m-px">
            Login
        </SubmitButton>
        <p className={`${state?.error ? 'text-red-500' : 'text-green-500'}`}>
            {state?.message}
        </p>
    </form>
}
