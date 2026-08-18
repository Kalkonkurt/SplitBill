'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitEvent } from 'react';

import AuthCard from '@/components/AuthCard';
import FormField from '@/components/FormField';
import ErrorAlert from '@/components/ErrorAlert';
import SubmitButton from '@/components/SubmitButton';
import AuthFooterLink from '@/components/AuthFooterLink';
import { useAuthUser } from '@/hooks/useAuth';

export default function LoginPage() {
	const router = useRouter();
	const { refetchUser } = useAuthUser();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			const res = await fetch('/api/login', {
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
			refetchUser();
			router.push('/dashboard');
		} catch (error) {
			setError('Could not reach the server. Please try again.');
			setIsSubmitting(false);
		}
	}
	return (
		<AuthCard title="Login">
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
					autoComplete="current-password"
					minLength={8}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <ErrorAlert message={error} />}
				<SubmitButton isSubmitting={isSubmitting} idleText="Log in" loadingText="Logging in..." />
			</form>
			<AuthFooterLink question="Don't have an account?" href="/signup" linkText="Sign up" />
		</AuthCard>
	);
}
