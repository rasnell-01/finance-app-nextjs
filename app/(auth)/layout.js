import Link from "next/link";
import {variants, sizes} from "@/lib/variants";

export default function Layout({children}) {
    return <main>
        <div className="absolute left-8 top-8">
            <Link href="./login/reset-password/" className={`${variants['ghost']} ${sizes['base']} flex items-center space-x-2 text-sm`}>
                <span>Reset Password</span>
            </Link>
        </div>
        <div className="mt-8">
            {children}
        </div>
    </main>
}
