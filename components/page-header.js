import DarkModeToggle from "./dark-mode-toggle";
import getServerDarkMode from "@/hooks/get-server-dark-mode";
import {createClient} from "@/lib/supabase/server";
import {variants, sizes} from "@/lib/variants";
import Button from "@/components/button";
import Link from "next/link";
import {use} from "react";
import {SquareUser, KeySquare} from "lucide-react";
import LogOutButton from "@/components/log-out-button";


export default function PageHeader({ className }) {
    const theme = use(getServerDarkMode());
    const supabase = use(createClient());
    const {data: {user}, error} = use(supabase.auth.getUser());
    return (
        <header className={`flex justify-between items-center ${className}`}>
            <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Finance
                App</Link>

            <div className="flex items-center">
                <DarkModeToggle defaultMode={theme}/>
                {user && <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <SquareUser  className="w-6 h-6"/>
                    <span>{user.email}</span>
                </Button>}
                {user && <LogOutButton/>}
                {!user && <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}>
                    <KeySquare className="w-6 h-6"/>
                </Link>}
            </div>
        </header>
    )
}
