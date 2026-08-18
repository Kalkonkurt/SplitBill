'use client';

import { useState, useEffect, useMemo } from 'react';
import type { AuthUser } from '@/context/AuthContext';

type Expense = {
	_id: string;
	title: string;
	amount: number;
	category: string;
	paidBy: string;
};

export default function MyExpensesCard({ user }: { user: AuthUser }) {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const myName = user.displayName || user.email;

	useEffect(() => {
		fetch('/api/expenses')
			.then((res) => {
				if (!res.ok) {
					throw new Error('Failed to fetch expenses');
				}
				return res.json();
			})
			.then((data: Expense[]) => {
				const mine = data.filter((expense) => expense.paidBy === myName);
				setExpenses(mine);
			})
			.catch(() => setError('Could not load expenses'))
			.finally(() => setLoading(false));
	}, [myName]);

	const total = useMemo(() => expenses.reduce((sum, expense) => sum + expense.amount, 0), [expenses]);

	return (
		<section aria-labelledby="my-expenses-title" className="h-full">
			<div className="card w-full h-full bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<h2 id="my-expenses-title" className="card-title">
						My Expenses
					</h2>

					{loading && <p>Loading...</p>}
					{error && <p role="alert">{error}</p>}

					{!loading && !error && (
						<>
							{expenses.length === 0 ? (
								<p>No expenses registered to you yet.</p>
							) : (
								<ul className="flex flex-col gap-2">
									{expenses.map((expense) => (
										<li key={expense._id} className="flex justify-between border-b border-base-200 pb-1">
											<span>
												{expense.title} <span className="opacity-60 text-sm">({expense.category})</span>
											</span>
											<span>{expense.amount} kr</span>
										</li>
									))}
								</ul>
							)}

							<div className="flex justify-between font-semibold mt-2">
								<span>Total</span>
								<span>{total} kr</span>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
