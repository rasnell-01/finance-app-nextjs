'use client';
import { useEffect, useState } from 'react';

export function useUserSettingsFromSupabase(initialSettings = null) {
    const [settings, setSettings] = useState(initialSettings || { dateFormat: 'DD MMM YYYY' });
    const [loading, setLoading] = useState(!initialSettings);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        // Check localStorage on client-side
        const savedSettings = typeof window !== 'undefined' ? localStorage.getItem('userSettings') : null;
        if (savedSettings) {
            try {
                const parsedSettings = JSON.parse(savedSettings);
                if (isMounted && (!initialSettings || Object.keys(initialSettings).length === 0)) {
                    setSettings(parsedSettings);
                }
            } catch (e) {
                console.error('Failed to parse saved settings:', e.message);
            }
        }

        // Use IIFE to handle async operation
        (async () => {
            if (!initialSettings) {
                await fetchUserSettings();
            } else if (isMounted) {
                setLoading(false);
            }
        })();

        async function fetchUserSettings() {
            try {
                const { createClient } = await import('@supabase/supabase-js');
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                );
                const { data: { session } } = await supabase.auth.getSession();
                console.log('Client-side session:', session);

                const { data: { user }, error: authError } = await supabase.auth.getUser();
                console.log('Client-side user:', user);
                console.log('Client-side auth error:', authError);

                if (authError) new Error(`Auth error: ${authError.message}`);
                if (!user || !session) new Error('No authenticated user or session found');

                const metadata = user?.user_metadata || {};
                console.log('Fetched user_metadata:', metadata);

                if (isMounted) {
                    setSettings(metadata);
                    localStorage.setItem('userSettings', JSON.stringify(metadata));
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Settings fetch error:', err.message);
                    setError(err.message);
                    setLoading(false);
                }
            }
        }

        return () => {
            isMounted = false;
        };
    }, [initialSettings]);

    return { settings, loading, error };
}
