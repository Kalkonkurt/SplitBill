import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { signSession, sessionCookieName } from '@/lib/auth';
import { User } from '@/models/Users';
function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
		const password = typeof body.password === 'string' ? body.password : '';

		if (!email || !isValidEmail(email)) {
			return NextResponse.json({ error: 'invalid email' }, { status: 400 });
		}

		if (!password || password.length < 8) {
			return NextResponse.json(
				{ error: 'password should be at least 8 characters long.' },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const users = client.db(process.env.MONGODB_DB).collection<User>('users');

		if (await users.findOne({ email })) {
			return NextResponse.json({ error: 'An account with that email already exists' }, { status: 409 });
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const result = await users.insertOne({ email, passwordHash, createdAt: new Date() });

		const token = await signSession({ userId: result.insertedId.toString(), email });

		const response = NextResponse.json({ message: 'Account created successfully' }, { status: 201 });

		response.cookies.set(sessionCookieName, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});
		return response;
	} catch (error) {
		console.error({ 'Signup error': error });
		return NextResponse.json({ error: 'Something Went wrong. Please try again.' }, { status: 500 });
	}
}
