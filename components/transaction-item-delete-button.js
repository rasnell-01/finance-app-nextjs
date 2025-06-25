'use client'
import Button from "@/components/button";
import {deleteTransaction} from "@/lib/actions";
import {OctagonX, LoaderPinwheel} from "lucide-react";
import {useState} from "react";

export default function TransactionItemDeleteButton({id, onRemoved}) {
    const [loading, setLoading] = useState()
    const [confirm, setConfirm] = useState()
    const handleClick = async () => {
        if (!confirm) {
            setConfirm(true)
            return
        }
        try {
            setLoading(true)
            await deleteTransaction(id)
            onRemoved()
        }finally {
            setLoading(false)
        }
    }
    return <Button size="xs" variant={!confirm ? 'ghost' : 'danger'} onClick={handleClick} aria-disabled={loading}>
        {!loading &&<OctagonX className="w-4 h-4"/>}
        {loading && <LoaderPinwheel className="animate-spin w-4 h-4"/>}
    </Button>
}
