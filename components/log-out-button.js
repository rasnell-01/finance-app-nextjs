'use client'
import SubmitButton from "@/components/submit-button";
import {LogOut} from "lucide-react";
import {logout} from "@/lib/actions";

export default function LogOutButton() {
    return <form action={logout}>
        <SubmitButton variant={"ghost"} size={"sm"}>
            <LogOut className={"w-6 h-6"}/>
        </SubmitButton>
    </form>
}
