import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { fetchTransactions } from '@/lib/actions';
import TransactionList from './transaction-list';

export default async function TransactionListWrapper({ range }) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // Ignored if called from Server Component
                    }
                },
            },
        }
    );

    const transactions = await fetchTransactions(range);
    let initialSettings = { dateFormat: 'DD MMM YYYY' }; // Default fallback
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) new Error(`Auth error: ${error.message}`);
        if (user) {
            initialSettings = user?.user_metadata || initialSettings;
        }
        console.log('Server-side user:', user);
        console.log('Server-side settings:', initialSettings);
    } catch (err) {
        console.error('Server-side settings error:', err.message);
    }

    return <TransactionList initialTransactions={transactions} initialSettings={initialSettings} key={range} range={range} />;
}
