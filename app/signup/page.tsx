'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitEvent } from 'react';

import AuthCard from '@/components/AuthCard';
import FormField from '@/components/FormField';
import ErrorAlert from '@/components/ErrorAlert';
import SubmitButton from '@/components/SubmitButton';
import AuthFooterLink from '@/components/AuthFooterLink';

export default function SignupPage() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		if (password !== confirmPassword) {
			setError('passwords must match');
			return;
		}
		setIsSubmitting(true);
		try {
			const res = await fetch('/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error ?? 'Something went wrong');
				setIsSubmitting(false);
				return;
			}
			router.push('/dashboard');
		} catch (error) {
			setError('Could not reach the server. Please try again.');
			setIsSubmitting(false);
		}
	}
	return (
		<AuthCard title="Create account">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<FormField
					label="Email"
					type="email"
					placeholder="you@example.com"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<FormField
					label="Password"
					type="password"
					placeholder="Password (min 8 characters)"
					autoComplete="new-password"
					minLength={8}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<FormField
					label="Confirm password"
					type="password"
					placeholder="Confirm password"
					autoComplete="new-password"
					minLength={8}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{error && <ErrorAlert message={error} />}
				<SubmitButton
					isSubmitting={isSubmitting}
					idleText="Sign up"
					loadingText="Creating account..."
				/>
			</form>
			<AuthFooterLink question="Already have an account?" href="/login" linkText="Log in" />
		</AuthCard>
	);
}
