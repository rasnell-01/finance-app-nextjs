'use client'
import LoginFormEmailPassword from "@/app/(auth)/login/components/login-form-email-password";
import LoginFormOTP from "@/app/(auth)/login/components/login-form-OTP";

export default function LoginForm() {
    return <div>
        <div className='flex flex-col space-y-8 text-center'>
            <h1 className="text-4xl font-semibold">Welcome Back</h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                Enter your email and password to continue.
            </p>
        </div>
        <div><LoginFormEmailPassword /></div>
        <div className='flex flex-col space-y-8 text-center'>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                Or enter your email to continue.
            </p>

        </div>
        <div><LoginFormOTP /></div>
        <div></div>
    </div>

}
