'use client';

import { useEffect, useMemo, useState } from 'react';
import AppShell from '@/components/AppShell';
import { useAuthUser } from '@/hooks/useAuth';
import { useBalances } from '@/hooks/useBalance';
import BalanceOverviewCard from '@/components/dashboard/BalanceOverviewCard';
import ActiveGroupsCard from '@/components/dashboard/ActiveGroupsCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import SpendingByCategoryChart from '@/components/dashboard/SpendingByCategoryChart';

type Group = {
	_id: string;
	name: string;
	members: string[];
	createdBy: string;
};

type Expense = {
	_id: string;
	title: string;
	amount: number;
	category: string;
	paidBy: string;
	splitBetween: string[];
	groupId: string;
	createdAt: string;
};

export default function DashboardPage() {
	const { user, loading: userLoading } = useAuthUser();

	const [groups, setGroups] = useState<Group[]>([]);
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [dataLoading, setDataLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!user) return;

		Promise.all([fetch('/api/groups'), fetch('/api/expenses')])
			.then(async ([groupsRes, expensesRes]) => {
				if (!groupsRes.ok || !expensesRes.ok) {
					throw new Error('Failed to load dashboard data');
				}
				const [groupsData, expensesData] = await Promise.all([groupsRes.json(), expensesRes.json()]);
				setGroups(groupsData);
				setExpenses(expensesData);
			})
			.catch(() => setError('Could not load dashboard data'))
			.finally(() => setDataLoading(false));
	}, [user]);

	const myMatchName = user?.displayName || user?.email || '';

	const balances = useBalances(expenses, myMatchName);

	const activeGroups = groups
		.filter((group) => group.members.includes(myMatchName))
		.map((group) => ({
			id: group._id,
			name: group.name,
			net: balances.perGroup[group._id]?.net ?? 0
		}));

	const recentActivity = expenses
		.filter((expense) => expense.paidBy === myMatchName || expense.splitBetween.includes(myMatchName))
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5)
		.map((expense) => ({
			id: expense._id,
			title: expense.title,
			amount: expense.amount,
			createdAt: expense.createdAt
		}));

	const categoryTotals = useMemo(() => {
		const totals: Record<string, number> = {};
		for (const expense of expenses) {
			const isInvolved = expense.paidBy === myMatchName || expense.splitBetween.includes(myMatchName);
			if (!isInvolved) continue;
			totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount;
		}
		return Object.entries(totals).map(([category, amount]) => ({ category, amount }));
	}, [expenses, myMatchName]);

	const loading = userLoading || dataLoading;

	return (
		<AppShell>
			<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Dashboard</h1>

			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p role="alert">{error}</p>
			) : (
				<div className="flex flex-col gap-4">
					<BalanceOverviewCard owed={balances.overall.owed} owing={balances.overall.owing} net={balances.overall.net} />

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
						<ActiveGroupsCard groups={activeGroups} />
						<RecentActivityCard activity={recentActivity} />
						<SpendingByCategoryChart data={categoryTotals} />
					</div>
				</div>
			)}
		</AppShell>
	);
}
