'use client';

import { useState, type SubmitEvent } from 'react';
import type { AuthUser } from '@/context/AuthContext';
import { useAuthUser } from '@/hooks/useAuth';
import FormField from '@/components/FormField';
import ErrorAlert from '@/components/ErrorAlert';
import SubmitButton from '@/components/SubmitButton';

type ProfileCardProps = {
	user: AuthUser;
	onSuccess?: () => void;
};

export default function ProfileCard({ user, onSuccess }: ProfileCardProps) {
	const { refetchUser } = useAuthUser();

	const [firstName, setFirstName] = useState(user.firstName ?? '');
	const [lastName, setLastName] = useState(user.lastName ?? '');
	const [displayName, setDisplayName] = useState(user.displayName ?? '');
	const [phone, setPhone] = useState(user.phone ?? '');

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setSuccess(false);
		setIsSubmitting(true);

		try {
			const res = await fetch('/api/me', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ firstName, lastName, displayName, phone })
			});
			const data = await res.json();

			if (!res.ok) {
				setError(data.error ?? 'Something went wrong');
				return;
			}

			await refetchUser();
			setSuccess(true);
			setTimeout(() => onSuccess?.(), 900);
		} catch {
			setError('Could not reach the server. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section className="flex flex-1 items-center justify-center p-4">
			<div className="card w-full max-w-sm bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<h2 className="card-title">Edit Info</h2>

					<form onSubmit={handleSubmit} className="flex flex-col gap-2">
						<FormField
							label="First name"
							type="text"
							placeholder="First name"
							autoComplete="given-name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required={false}
						/>
						<FormField
							label="Last name"
							type="text"
							placeholder="Last name"
							autoComplete="family-name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required={false}
						/>
						<FormField
							label="Display name"
							type="text"
							placeholder="Display name"
							autoComplete="nickname"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							required={false}
						/>
						<FormField
							label="Phone"
							type="tel"
							placeholder="Phone number"
							autoComplete="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required={false}
							pattern="^[0-9\-\+\s\(\)]{7,20}$"
							title="Only numbers, spaces and + - ( ) are allowed"
						/>

						{error && <ErrorAlert message={error} />}
						{success && (
							<div className="alert alert-success text-sm">
								<span>Profile updated</span>
							</div>
						)}

						<SubmitButton isSubmitting={isSubmitting} idleText="Save" loadingText="Saving..." />
					</form>
				</div>
			</div>
		</section>
	);
}
