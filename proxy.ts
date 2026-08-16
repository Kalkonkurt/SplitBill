import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { verifySession, sessionCookieName } from './lib/auth';
export const config = {
	matcher: [
		'/dashboard/:path*',
		'/groups/:path*',
		'/expenses/:path*',
		'/profile/:path*',
		'/statistics/:path*'
	]
};

export default async function proxy(request: NextRequest) {
	const cookiesResponse = request.cookies.get(sessionCookieName);
	if (!cookiesResponse) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	const sessionResponse = await verifySession(cookiesResponse.value);
	if (!sessionResponse) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}
