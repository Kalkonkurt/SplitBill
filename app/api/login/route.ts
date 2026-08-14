import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { signSession, sessionCookieName } from '@/lib/auth';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
		const password = typeof body.password === 'string' ? body.password : '';
		if (!email || !password) {
			return NextResponse.json({ error: 'email and password needed' }, { status: 400 });
		}

		const client = await clientPromise;
		const users = client.db(process.env.MONGODB_DB).collection('users');

		const user = await users.findOne({ email });

		if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
			return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
		}
		const token = await signSession({ userId: user._id.toString(), email });
		const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

		response.cookies.set(sessionCookieName, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});
		return response;
	} catch (error) {
		console.error({ 'Login error': error });
		return NextResponse.json({ error: 'Something Went wrong. Please try again.' }, { status: 500 });
	}
}
