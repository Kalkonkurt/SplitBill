import { useMemo } from 'react';

type expenseForBalance = {
	amount: number;
	paidBy: string;
	splitBetween: string[];
	groupId: string;
};

type Balance = {
	owed: number;
	owing: number;
	net: number;
};

export function useBalances(expenses: expenseForBalance[], myMatchName: string) {
	return useMemo(() => {
		const overall: Balance = { owed: 0, owing: 0, net: 0 };
		const perGroup: Record<string, Balance> = {};

		for (const expense of expenses) {
			const share = expense.amount / expense.splitBetween.length;
			const isPayer = expense.paidBy === myMatchName;
			const isSplitMember = expense.splitBetween.includes(myMatchName);

			if (!isPayer && !isSplitMember) {
				continue;
			}

			const myShare = isSplitMember ? share : 0;
			const contribution = isPayer ? expense.amount - myShare : -myShare;

			if (!perGroup[expense.groupId]) {
				perGroup[expense.groupId] = { owed: 0, owing: 0, net: 0 };
			}
			overall.net += contribution;
			perGroup[expense.groupId].net += contribution;

			if (contribution > 0) {
				overall.owed += contribution;
				perGroup[expense.groupId].owed += contribution;
			} else if (contribution < 0) {
				overall.owing += Math.abs(contribution);
				perGroup[expense.groupId].owing += Math.abs(contribution);
			}
		}
		return { overall, perGroup };
	}, [expenses, myMatchName]);
}
