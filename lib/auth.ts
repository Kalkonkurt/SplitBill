import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET undefined or empty');
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export const sessionCookieName = 'session';
const SESSION_DURATION = '7d';

export type SessionPayload = {
	userId: string;
	email: string;
};

export async function signSession(payload: SessionPayload): Promise<string> {
	return await new SignJWT({ ...payload })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(SESSION_DURATION)
		.sign(secretKey);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
	try {
		const { payload } = await jwtVerify(token, secretKey);
		return payload as unknown as SessionPayload;
	} catch {
		return null;
	}
}

export async function getCurrentSession(): Promise<SessionPayload | null> {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get(sessionCookieName);

	if (!sessionCookie) {
		return null;
	}

	return await verifySession(sessionCookie.value);
}
