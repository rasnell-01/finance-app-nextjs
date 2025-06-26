import { useFormatCurrency } from "@/hooks/use-format-currency";
import { useFormatDate } from "@/hooks/use-format-date";

export default function TransactionSummaryItem({date, amount}) {
  const formattedAmount = useFormatCurrency(amount)
  const formattedDate = useFormatDate(date);

  return (<div className="flex text-gray-500 dark:text-gray-400 font-semibold">
    <div className="grow">
      {formattedDate}
    </div>

    <div className="min-w-[70px] text-right font-semibold">{formattedAmount}</div>
    <div className="min-w-[50px]"></div>
  </div>)
}
