import { useMemo } from 'react';
import { useUserSettingsFromSupabase } from '@/lib/userSettingsFromSupabase';
import { CURRENCY_SYMBOLS } from '@/lib/consts.js';

// Mapping for common currency locales (adjust as needed based on your regions)
const CURRENCY_LOCALES = {
  USD: 'en-US',
  EUR: 'en-IE', // Adjust to your preferred EUR locale (e.g., fr-FR, de-DE)
  GBP: 'en-GB',
  JPY: 'ja-JP',
  CAD: 'en-CA',
  AUD: 'en-AU',
  CHF: 'de-CH',
  CNY: 'zh-CN',
  INR: 'en-IN',
  KRW: 'ko-KR',
  RUB: 'ru-RU',
  BRL: 'pt-BR',
  ZAR: 'en-ZA',
  MXN: 'es-MX',
  SGD: 'en-SG',
};

const DEFAULT_CURRENCY = 'USD';
const DEFAULT_LOCALE = 'en-US';

export const useFormatCurrency = (amount, initialSettings = null) => {
  const { settings, loading, error } = useUserSettingsFromSupabase(initialSettings);
  const loadingCurrency = loading;

  // Choose user preference or fallback
  const currency = typeof settings?.currency === 'string' && settings.currency.length
      ? settings.currency
      : DEFAULT_CURRENCY;
  const locale = CURRENCY_LOCALES[currency] || DEFAULT_LOCALE; // Derive locale from currency

  // Get currency symbol from CURRENCY_SYMBOLS
  const currencySymbol = CURRENCY_SYMBOLS.find((c) => c.code === currency)?.symbol || currency;

  const formattedCurrency = useMemo(() => {
    if (loadingCurrency || error) return '';
    if (amount == null || isNaN(amount)) return 'N/A';
    try {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
    } catch (e) {
      console.error('Currency formatting error:', e.message);
      return `${currencySymbol}${Number(amount).toFixed(2)}`; // Fallback with symbol
    }
  }, [amount, currency, locale, loadingCurrency, error, currencySymbol]);

  console.log(
      'Settings:',
      settings,
      'Currency:',
      currency,
      'Locale:',
      locale,
      'Symbol:',
      currencySymbol,
      'Formatted:',
      formattedCurrency
  );

  return { formattedCurrency, loadingCurrency, error };
};
