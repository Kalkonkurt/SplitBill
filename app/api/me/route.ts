import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { User } from '@/models/Users';

export async function GET() {
	try {
		const session = await getCurrentSession();

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
				firstName: user.firstName,
				lastName: user.lastName,
				displayName: user.displayName,
				phone: user.phone,
				avatarUrl: user.avatarUrl,
				createdAt: user.createdAt
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error({ 'Me error': error });
		return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
	}
}

export async function PATCH(request: Request) {
	try {
		const session = await getCurrentSession();

		if (!session) {
			return NextResponse.json({ error: 'No active session found' }, { status: 401 });
		}

		const body = await request.json();

		const updateFields: Partial<Pick<User, 'firstName' | 'lastName' | 'displayName' | 'phone' | 'avatarUrl'>> =
			{};

		if (typeof body.firstName === 'string') {
			updateFields.firstName = body.firstName;
		}
		if (typeof body.lastName === 'string') {
			updateFields.lastName = body.lastName;
		}
		if (typeof body.displayName === 'string') {
			updateFields.displayName = body.displayName;
		}
		if (typeof body.phone === 'string') {
			updateFields.phone = body.phone;
		}
		if (typeof body.avatarUrl === 'string') {
			const MAX_AVATAR_LENGTH = 3_000_000;
			if (body.avatarUrl.length > MAX_AVATAR_LENGTH) {
				return NextResponse.json({ error: 'Image is too large' }, { status: 400 });
			}
			updateFields.avatarUrl = body.avatarUrl;
		}

		if (Object.keys(updateFields).length === 0) {
			return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
		}

		const client = await clientPromise;
		const users = client.db(process.env.MONGODB_DB).collection<User>('users');

		const result = await users.updateOne({ _id: new ObjectId(session.userId) }, { $set: updateFields });

		if (result.matchedCount === 0) {
			return NextResponse.json({ error: 'No active session found' }, { status: 401 });
		}

		return NextResponse.json({ message: 'Profile updated', ...updateFields }, { status: 200 });
	} catch (error) {
		console.error({ 'Update profile error': error });
		return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
	}
}
