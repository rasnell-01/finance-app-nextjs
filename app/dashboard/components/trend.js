import BaseTrend from '@/components/trend';
import { createClient } from '@/lib/supabase/server';

export default async function Trend({ type, range }) {
    const supabase = await createClient();
    let { data, error } = await supabase.rpc('calculate_total', {
        range_arg: range,
        type_arg: type,
    });
    if (error) throw new Error('Could not fetch the trend data');

    // Safely access the first item with fallback
    const amounts = data?.[0] || {};
    const currentAmount = amounts.current_amount || 0;
    const prevAmount = amounts.previous_amount || 0;

    // Fetch user_metadata for initialSettings
    let initialSettings = { dateFormat: 'DD MMM YYYY', currency: 'USD' }; // Default fallback
    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) new Error(`Auth error: ${authError.message}`);
        if (user) {
            initialSettings = user?.user_metadata || initialSettings;
        }
        console.log('Server-side user:', user);
        console.log('Server-side settings:', initialSettings);
    } catch (err) {
        console.error('Server-side settings error:', err.message);
    }

    return (
        <BaseTrend
            type={type}
            amount={currentAmount}
            prevAmount={prevAmount}
            initialSettings={initialSettings}
        />
    );
}
