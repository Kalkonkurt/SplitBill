"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ExpenseHeader from "@/components/expenses/ExpenseHeader";
import ExpenseDetailsFields from "@/components/expenses/ExpenseDetailsFields";
import PaidBySelect from "@/components/expenses/PaidBySelect";
import SplitMembersSelect from "@/components/expenses/SplitMembersSelect";
import SplitPreview from "@/components/expenses/SplitPreview";
import ExpenseActions from "@/components/expenses/ExpenseActions";

type Group = {
  _id: string;
  name: string;
  members: string[];
};

export default function AddExpensePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const groupId = searchParams.get("groupId") ?? "";

  const [group, setGroup] = useState<Group | null>(null);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [loadingGroup, setLoadingGroup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGroup() {
      if (!groupId) {
        setLoadingGroup(false);
        setError("No group selected.");
        return;
      }

      try {
        // Get the selected group
        const response = await fetch(`/api/groups/${groupId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch group");
        }

        const data: Group = await response.json();

        setGroup(data);

        // Select all members by default
        setSelectedMembers(data.members);
      } catch (error) {
        console.error(error);
        setError("Could not load the group.");
      } finally {
        setLoadingGroup(false);
      }
    }

    fetchGroup();
  }, [groupId]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (!group) {
      setError("No group selected.");
      return;
    }

    if (selectedMembers.length === 0) {
      setError("Select at least one member.");
      return;
    }

    if (!paidBy) {
      setError("Select who paid.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Save expense in our API
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          category,
          paidBy,
          splitBetween: selectedMembers,
          groupId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create expense");
      }

      // Go back to the group
      router.push(`/groups/${groupId}`);
    } catch (error) {
      console.error(error);
      setError("Could not save the expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    if (groupId) {
      router.push(`/groups/${groupId}`);
    } else {
      router.push("/groups");
    }
  }

  if (loadingGroup) {
    return <p>Loading group...</p>;
  }

  return (
    <main>
      <ExpenseHeader groupId={groupId} />

      {error && <p role="alert">{error}</p>}

      {group && (
        <form onSubmit={handleSubmit}>
          <ExpenseDetailsFields
            title={title}
            amount={amount}
            category={category}
            onTitleChange={setTitle}
            onAmountChange={setAmount}
            onCategoryChange={setCategory}
          />

          <PaidBySelect
            members={group.members}
            paidBy={paidBy}
            onChange={setPaidBy}
          />

          <SplitMembersSelect
            members={group.members}
            selectedMembers={selectedMembers}
            onChange={setSelectedMembers}
          />

          <SplitPreview
            amount={amount}
            selectedMembers={selectedMembers}
          />

          <ExpenseActions
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </form>
      )}
    </main>
  );
}