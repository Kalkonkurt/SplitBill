"use client";

import { use, useEffect, useState } from "react";

import GroupDetailsHeader from "@/components/group-details/GroupDetailsHeader";
import MembersList from "@/components/group-details/MembersList";
import BalanceSummary from "@/components/group-details/BalanceSummary";
import ExpenseList from "@/components/group-details/ExpenseList";
import EditExpenseForm from "@/components/expenses/EditExpenseForm";

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
  paidBy: string;
  category: string;
  groupId: string;
  splitBetween?: string[];
};

type Balance = {
  from: string;
  to: string;
  amount: number;
};

type GroupDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function GroupDetailsPage({
  params,
}: GroupDetailsPageProps) {
  const { id } = use(params);

  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGroupData() {
      try {
        setError("");

        // Get the selected group
        const groupResponse = await fetch(`/api/groups/${id}`);

        if (!groupResponse.ok) {
          throw new Error("Failed to fetch group");
        }

        const groupData = await groupResponse.json();
        setGroup(groupData);

        // Get all expenses
        const expensesResponse = await fetch("/api/expenses");

        if (!expensesResponse.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const expensesData: Expense[] =
          await expensesResponse.json();

        // Only show expenses from this group
        const groupExpenses = expensesData.filter(
          (expense) => expense.groupId === id
        );

        setExpenses(groupExpenses);

        // Balance calculation will be added later
        setBalances([]);
      } catch (error) {
        console.error(error);
        setError("Could not load the group.");
      } finally {
        setLoading(false);
      }
    }

    fetchGroupData();
  }, [id]);

  function handleEdit(expenseId: string) {
    // Find the selected expense
    const expense = expenses.find(
      (expense) => expense._id === expenseId
    );

    if (expense) {
      setEditingExpense(expense);
    }
  }

  async function handleDelete(expenseId: string) {
    try {
      // Delete the expense
      const response = await fetch(
        `/api/expenses/${expenseId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      // Remove it from the page
      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense._id !== expenseId
        )
      );
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  }

  async function refreshExpenses() {
    try {
      // Get updated expenses
      const response = await fetch("/api/expenses");

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data: Expense[] = await response.json();

      // Only keep expenses from this group
      const groupExpenses = data.filter(
        (expense) => expense.groupId === id
      );

      setExpenses(groupExpenses);

      // Close the edit form
      setEditingExpense(null);
    } catch (error) {
      console.error("Failed to refresh expenses:", error);
    }
  }

  if (loading) {
    return <p>Loading group...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!group) {
    return <p>Group not found.</p>;
  }

  return (
    <main>
      <GroupDetailsHeader
        groupName={group.name}
        groupId={group._id}
      />

      <MembersList members={group.members} />

      <BalanceSummary balances={balances} />

      {editingExpense && (
        <EditExpenseForm
          expense={editingExpense}
          members={group.members}
          onUpdated={refreshExpenses}
          onCancel={() => setEditingExpense(null)}
        />
      )}

      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}