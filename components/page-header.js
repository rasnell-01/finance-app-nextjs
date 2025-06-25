import DarkModeToggle from "./dark-mode-toggle";
import getServerDarkMode from "@/hooks/get-server-dark-mode";
import {createClient} from "@/lib/supabase/server";
import {variants, sizes} from "@/lib/variants";
import LogOutButton from "./log-out-button";
import Avatar from "./avatar";
import Link from "next/link";
import {use} from "react";
import {KeySquare} from "lucide-react";

export default function PageHeader({ className }) {
    const theme = use(getServerDarkMode());
    const supabase = use(createClient());
    const {data: {user}} = use(supabase.auth.getUser());
    return (
        <header className={`flex justify-between items-center ${className}`}>
            <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">
                Finance App
            </Link>

            <div className="flex items-center">
                <DarkModeToggle defaultMode={theme}/>
                {user && <Link href="/dashboard/settings" className={`flex items-center space-x-1 ${variants['ghost']} ${sizes['sm']}`}>
                    <Avatar />
                    <span>{user?.email}</span>
                </Link>}
                {user && <LogOutButton/>}
                {!user && <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}>
                    <KeySquare className="w-6 h-6"/>
                </Link>}
            </div>
        </header>
    )
}
