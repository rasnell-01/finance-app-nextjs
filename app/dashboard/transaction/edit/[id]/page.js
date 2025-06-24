import TransactionEditForm from "./transaction-edit-form";
import { fetchTransactionById } from "@/lib/actions";

export const metadata = {
    title: "Edit Transaction"
}

export default async function Page({ params }) {
    const transaction = await fetchTransactionById(params.id);

    return (
        <>
            <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
            <TransactionEditForm transaction={transaction} id={params.id} />
        </>
    );
}
