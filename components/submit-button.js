'use client'
import {useFormStatus} from "react-dom";
import {LoaderPinwheel} from "lucide-react";
import Button from "@/components/button";

export default function SubmitButton(props) {
    const {pending } = useFormStatus()
    return <Button {...props} className={`${props.className} flex items-center justify-center space-x-1`}>
        {pending && <LoaderPinwheel className="animate-spin w-4 h-4"/>}
        <span>{props.children}</span>
    </Button>
}
