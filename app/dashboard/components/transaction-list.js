'use client'
import Button from "@/components/button";
import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { fetchTransactions } from "@/lib/actions";
import { groupAndSumTransactionsByDate } from "@/lib/utils";
import { useState } from "react";
import {LoaderPinwheel} from "lucide-react";

export default function TransactionList({range, initialTransactions}) {
    const [transactions, setTransactions] = useState(initialTransactions)
    const [offset, setOffset] = useState(initialTransactions.length)
    const [buttonHidden, setButtonHidden] = useState(initialTransactions.length === 0)
    const [loading, setLoading] = useState(false)
    const grouped = groupAndSumTransactionsByDate(transactions)

    const handleClick = async (e) => {
        setLoading(true)
        let nextTransactions = null
        try {
            nextTransactions = await fetchTransactions(range, offset, 10)
            setButtonHidden(nextTransactions.length === 0)
            setOffset(prevValue => prevValue + 10)
            setTransactions(prevTransactions => [
                ...prevTransactions,
                ...nextTransactions
            ])
        }finally {
            setLoading(false)
        }
    }

    const handleRemoved = (id) => async () => {
        setLoading(true);
        try {
            setTransactions(prev => prev.filter(t => t.id !== id));
            const refreshed = await fetchTransactions(range, 0, offset);
            setTransactions(refreshed);
            setOffset(refreshed.length);
            setButtonHidden(refreshed.length < offset);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            {Object.entries(grouped)
                .map(([date, { transactions, amount }]) =>
                    <div key={date}>
                        <TransactionSummaryItem date={date} amount={amount} />
                        <Separator />
                        <section className="space-y-4">
                            {transactions.map(transaction => <div key={transaction.id}>
                                <TransactionItem
                                    {...transaction}
                                    onRemoved={handleRemoved(transaction.id)}/>
                            </div>)}
                        </section>
                    </div>
                )}
            {transactions.length === 0 && <div className="text-center text-gray-400 dark:text-gray-500">No transactions found</div>}
            {!buttonHidden && <div className="flex justify-center">
                <Button variant="ghost" onClick={handleClick} disabled={loading}>
                    <div className="flex items-center justify-center min-h-[1.5em]">
                        {loading
                            ? <LoaderPinwheel className="animate-spin" />
                            : <span>Load More</span>
                        }
                    </div>
                </Button>
            </div>}
        </div>
    )
}
