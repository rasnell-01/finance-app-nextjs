'use client'
import TransactionForm from "@/app/dashboard/components/transaction-form";
import { updateTransaction } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function TransactionEditForm({ transaction, id }) {
    const router = useRouter();

    const handleUpdate = async (data) => {
        await updateTransaction(id, data);
        router.push('/dashboard');
    };

    return (
        <TransactionForm
            defaultValues={transaction}
            onSubmit={handleUpdate}
            submitLabel="Update"
        />
    );
}
