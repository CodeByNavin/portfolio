import {
    NextRequest,
    NextResponse
} from 'next/server';
import {
    getToken
} from 'next-auth/jwt';

export async function middleware(req: NextRequest) {

    // Get the session token from the request and assert the type to the correct shape
    const token = await getToken({
        req
    })

    // Check if the user is authenticated
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // If user is accessing /dashboard, allow access if they're signed in
    if (req.nextUrl.pathname.startsWith('/admin') && token) {
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};