import { createClient } from "@/lib/supabase/server"
import { NextResponse } from 'next/server'

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const next = searchParams.get('next') ?? '/'
    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = next
    redirectTo.searchParams.delete('token_hash')
    redirectTo.searchParams.delete('type')
    if (token_hash && type) {
        const supabase = await createClient()
        const {error} = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (!error) {
            redirectTo.searchParams.delete('next')
            return NextResponse.redirect(redirectTo)
        }
    } else {
        redirectTo.pathname = '/error'
        return NextResponse.redirect(redirectTo)
    }
}
