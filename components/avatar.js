import {createClient} from "@/lib/supabase/server";
import {SquareUser} from "lucide-react";
import Image from "next/image";

export default async function Avatar({ width = 32, height = 32}) {
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()
    const {data: imageData, error} = await supabase.storage
        .from('avatars')
        .createSignedUrl(user.user_metadata?.avatar, { expiresIn: 3600 })

    if (error || !imageData?.signedUrl) {
        return <SquareUser className="w-6 h-6" />;
    }

    return (
        <>
            <Image
                src={imageData.signedUrl + '?t=' + Date.now()}
                width={width}
                height={height}
                alt="User avatar"
                className="rounded-full"
            />
        </>
    );
}
