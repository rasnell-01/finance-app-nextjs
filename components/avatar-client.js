'use client'
import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import Image from "next/image";
import { SquareUser } from "lucide-react";
import { createClientInstance } from "@/lib/supabase/client";

const AvatarClient = forwardRef(function AvatarClient({ userId, width = 32, height = 32 }, ref) {
    const [avatarUrl, setAvatarUrl] = useState(null);

    const fetchAvatar = useCallback(async () => {
        if (!userId) return setAvatarUrl(null);
        const supabase = createClientInstance();

        for (const ext of ["jpg", "jpeg", "png"]) {
            const filePath = `${userId}.${ext}`;
            const { data, error } = await supabase.storage
                .from("avatars")
                .createSignedUrl(filePath, 60 * 60);

            if (!error && data?.signedUrl) {
                setAvatarUrl(`${data.signedUrl}&t=${Date.now()}`);
                return;
            }
        }
        setAvatarUrl(null);
    }, [userId]);

    useImperativeHandle(ref, () => ({
        refresh: fetchAvatar
    }), [fetchAvatar]);

    useEffect(() => {
        void fetchAvatar();
    }, [fetchAvatar]);

    if (!avatarUrl) {
        return <SquareUser className="w-6 h-6" />;
    }

    return (
        <Image
            src={avatarUrl}
            width={width}
            height={height}
            alt="User avatar"
            className="rounded-full"
        />
    );
});

export default AvatarClient;
