"use client";

import { FormEvent, useState } from "react";

type EditExpenseFormProps = {
  expense: {
    _id: string;
    title: string;
    amount: number;
    category: string;
    paidBy: string;
    splitBetween?: string[];
  };
  members: string[];
  onUpdated: () => void;
  onCancel: () => void;
};

export default function EditExpenseForm({
  expense,
  members,
  onUpdated,
  onCancel,
}: EditExpenseFormProps) {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(String(expense.amount));
  const [category, setCategory] = useState(expense.category);
  const [paidBy, setPaidBy] = useState(expense.paidBy);
  const [splitBetween, setSplitBetween] = useState<string[]>(
    expense.splitBetween ?? members
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(`/api/expenses/${expense._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount: Number(amount),
        category,
        paidBy,
        splitBetween,
      }),
    });

    if (!response.ok) {
      console.error("Failed to update expense");
      return;
    }

    onUpdated();
  }

  function toggleMember(member: string) {
    setSplitBetween((current) =>
      current.includes(member)
        ? current.filter((item) => item !== member)
        : [...current, member]
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit expense</h2>

      <label htmlFor="edit-title">Title</label>
      <input
        id="edit-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label htmlFor="edit-amount">Amount</label>
      <input
        id="edit-amount"
        type="number"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        required
      />

      <label htmlFor="edit-category">Category</label>
      <select
        id="edit-category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="edit-paid-by">Who paid?</label>
      <select
        id="edit-paid-by"
        value={paidBy}
        onChange={(event) => setPaidBy(event.target.value)}
      >
        {members.map((member) => (
          <option key={member} value={member}>
            {member}
          </option>
        ))}
      </select>

      <fieldset>
        <legend>Split between</legend>

        {members.map((member) => (
          <label key={member}>
            <input
              type="checkbox"
              checked={splitBetween.includes(member)}
              onChange={() => toggleMember(member)}
            />
            {member}
          </label>
        ))}
      </fieldset>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>

      <button type="submit">
        Save changes
      </button>
    </form>
  );
}