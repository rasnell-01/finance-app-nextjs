import Button from "@/components/button";
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TransactionItemEditButton({ id }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/dashboard/transaction/edit/${id}`);
    };

    return (
        <Button
            size="xs"
            variant="ghost"
            onClick={handleClick}
            aria-label="Edit transaction"
        >
            <SquarePen className="w-4 h-4" />
        </Button>
    );
}
