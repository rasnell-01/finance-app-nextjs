'use client'
import { useEffect, useState } from "react";
import { createClientInstance } from "@/lib/supabase/client";

// Fetch all user settings from metadata
export function useUserSettings() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClientInstance();
        let isMounted = true;

        (async function fetchUserSettings() {
            const { data: { user } } = await supabase.auth.getUser();
            if (isMounted) {
                setSettings(user?.user_metadata || {});
                setLoading(false);
            }
        })();

        return () => { isMounted = false; };
    }, []);

    return { settings, loading };
}

// Read or update a single setting key in user metadata
export function useUserSetting(key) {
    const { settings, loading } = useUserSettings();
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Update a single setting in metadata
    const setSetting = async (value) => {
        setUpdating(true);
        setError(null);
        const supabase = createClientInstance();

        // Update just the selected key, keeping other metadata intact
        const { data: { user } } = await supabase.auth.getUser();
        const prev = user?.user_metadata || {};
        const newMetadata = { ...prev, [key]: value };

        const { error } = await supabase.auth.updateUser({
            data: newMetadata,
        });

        setUpdating(false);
        if (error) setError(error.message);
    };

    return {
        value: settings?.[key],
        setSetting,
        loading,
        updating,
        error,
    };
}
