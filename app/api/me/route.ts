import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, sessionCookieName } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { User } from '@/models/Users';

export async function GET() {
	try {
		const cookieStore = await cookies();
		const sessionCookie = cookieStore.get(sessionCookieName);

		if (!sessionCookie) {
			return NextResponse.json({ error: 'No active session found' }, { status: 401 });
		}

		const session = await verifySession(sessionCookie.value);

		if (!session) {
			return NextResponse.json({ error: 'No active session found' }, { status: 401 });
		}

		const client = await clientPromise;
		const users = client.db(process.env.MONGODB_DB).collection<User>('users');

		const user = await users.findOne({ _id: new ObjectId(session.userId) });

		if (!user) {
			return NextResponse.json({ error: 'No active session found' }, { status: 401 });
		}

		return NextResponse.json(
			{
				userId: user._id.toString(),
				email: user.email,
				createdAt: user.createdAt
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error({ 'Me error': error });
		return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
	}
}
