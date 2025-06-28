import ResetForm from "@/app/(auth)/login/reset-password/components/reset-form";
import Link from "next/link";
import {sizes, variants} from "@/lib/variants";
import {ChevronLeftIcon} from "lucide-react";

export default function Page() {
    return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-40">
        <div className="absolute right-8 top-8">
            <Link href="/" className={`${variants['ghost']} ${sizes['base']} flex items-center space-x-2 text-sm`}>
                <ChevronLeftIcon className="w-4 h-4" />
                <span>Return to Login</span>
            </Link>
        </div>
        <div>
            <ResetForm />
        </div>
    </div>
}
