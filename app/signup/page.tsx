'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import type { FormEvent } from 'react';

export default function SignupPage() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
		<main className="flex flex-1 items-center justify-center p-4">
			<div className="card w-full max-w-sm bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<h1 className="card-title">Sign in</h1>
					<form onSubmit={handleSubmit} className="flex flex-col gap-2">
						<fieldset className="fieldset">
							<legend className="fieldset-legend sr-only">Email</legend>
							<input
								type="email"
								required
								autoComplete="email"
								className="input w-full rounded-2xl"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</fieldset>
						<fieldset className="fieldset">
							<legend className="fieldset-legend sr-only">Password</legend>
							<input
								type="password"
								required
								autoComplete="new-password"
								className="input w-full rounded-2xl"
								placeholder="Password (min 8 characters)"
								minLength={8}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</fieldset>
						<fieldset className="fieldset">
							<legend className="fieldset-legend sr-only">Confirm password</legend>
							<input
								type="password"
								required
								autoComplete="new-password"
								className="input w-full rounded-2xl"
								placeholder="Confirm password"
								minLength={8}
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</fieldset>
						{error && (
							<div className="alert alert-error text-sm">
								<span>{error}</span>
							</div>
						)}
						<button
							type="submit"
							className="btn btn-primary w-full rounded-2xl mt-2"
							disabled={isSubmitting}
						>
							{isSubmitting && <span className="loading loading-spinner" />}
							{isSubmitting ? 'Creating account...' : 'Sign up'}
						</button>
					</form>
					<p className="text-sm mt-2">
						Already have an account?{' '}
						<Link href="/login" className="link link-primary">
							Log in
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
