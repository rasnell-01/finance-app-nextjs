import LoginForm from "@/app/(auth)/login/components/login-form";
import Link from "next/link";
import {sizes, variants} from "@/lib/variants";
import {ChevronLeftIcon} from "lucide-react";

export default function Page() {
    return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-40">
        <div>
            <LoginForm/>
        </div>
    </div>
}
