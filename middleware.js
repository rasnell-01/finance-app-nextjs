import {updateSession} from "@/lib/supabase/middleware";
import {createClient} from "@/lib/supabase/server";

export async function middleware(request) {
    const supabase = await createClient();
    const { data: { user }} = await supabase.auth.getUser()

    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
        const loginUrl = new URL('/login', request.nextUrl.origin);
        return Response.redirect(loginUrl, 302);
    }

    if (user && request.nextUrl.pathname.startsWith('/login')) {
        const dashboardUrl = new URL('/dashboard', request.nextUrl.origin);
        return Response.redirect(dashboardUrl, 302);
    }

    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
