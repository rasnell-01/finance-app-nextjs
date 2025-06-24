import LoginForm from "@/app/(auth)/login/components/login-form";

export default function Page() {
    return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-40">
        <div className='flex flex-col space-y-8 text-center'>
            <h1 className="text-4xl font-semibold">Welcome Back</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password to continue.
            </p>
        </div>
        <div>
            <LoginForm />
        </div>
    </div>
}
