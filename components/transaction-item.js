import { useFormatCurrency } from '@/hooks/use-format-currency';
import { Wallet, Landmark, Vault, BanknoteArrowUp, BanknoteArrowDown} from 'lucide-react';
import TransactionItemDeleteButton from '@/components/transaction-item-delete-button';
import TransactionItemEditButton from '@/components/transaction-item-edit-button';

export default function TransactionItem({id, type, category, description, amount, onRemoved, initialSettings = null,}) {
  console.log('TransactionItem initialSettings:', initialSettings); // Debug prop
  const typesMap = {
    Income: {
      icon: BanknoteArrowUp,
      colors: 'text-green-500 dark:text-green-400',
    },
    Expense: {
      icon: BanknoteArrowDown,
      colors: 'text-red-500 dark:text-red-400',
    },
    Saving: {
      icon: Vault,
      colors: 'text-indigo-500 dark:text-indigo-400',
    },
    Investment: {
      icon: Landmark,
      colors: 'text-yellow-500 dark:text-yellow-400',
    },
  };
  const defaultType = {
    icon: Wallet,
    colors: 'text-gray-500 dark:text-gray-400',
  };
  const typeConfig = typesMap[type] || defaultType;
  const IconComponent = typeConfig.icon;
  const colors = typeConfig.colors;
  const { formattedCurrency, loadingCurrency } = useFormatCurrency(amount, initialSettings);

  if (loadingCurrency) {
    return (
        <div className="flex text-gray-500 dark:text-gray-400 font-semibold">
          <div className="grow">Loading…</div>
          <div className="min-w-[70px] text-right font-semibold"></div>
          <div className="min-w-[50px]"></div>
        </div>
    );
  }

  return (
      <div className="w-full flex items-center">
        <div className="flex items-center mr-4 grow">
          <IconComponent className={`${colors} mr-2 w-4 h-4 hidden sm:block`} />
          <span>{description}</span>
        </div>

        <div className="min-w-[150px] items-center hidden md:flex">
          {category && (
              <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
                {category}
              </div>
          )}
        </div>

        <div className="min-w-[70px] text-right">{formattedCurrency}</div>

        <div className="min-w-[100px] flex justify-end">
          <TransactionItemEditButton id={id} />
          <TransactionItemDeleteButton id={id} onRemoved={onRemoved} />
        </div>
      </div>
  );
}
