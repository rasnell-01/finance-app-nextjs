import { useMemo } from "react";
import { userDefaults } from "@/lib/user-defaults";
import { useUser } from "@/lib/use-user";

export const useFormatCurrency = (amount, currency, locale) => {
  const { user } = useUser();

  const finalCurrency =
      currency || user?.user_metadata?.currency || userDefaults.currency;
  const finalLocale =
      locale || user?.user_metadata?.locale || "en-US";

  return useMemo(
      () => new Intl.NumberFormat(finalLocale, { style: 'currency', currency: finalCurrency }).format(amount),
      [amount, finalCurrency, finalLocale]
  );
};
