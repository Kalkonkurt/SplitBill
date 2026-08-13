"use client";

import { FormEvent, useState } from "react";

type CreateGroupFormProps = {
  onGroupCreated: () => void;
  onCancel: () => void;
};

export default function CreateGroupForm({
  onGroupCreated,
  onCancel,
}: CreateGroupFormProps) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    // Convert member names to an array
    const memberList = members
      .split(",")
      .map((member) => member.trim())
      .filter(Boolean);

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          members: memberList,
          createdBy: "Meaza",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      // Update the group list
      onGroupCreated();

      setName("");
      setMembers("");
    } catch (error) {
      console.error(error);
      setError("Could not create group. Please try again.");
    }
  }

  return (
    <section aria-labelledby="create-group-title">
      <h2 id="create-group-title">Create group</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="group-name">Group name</label>

          <input
            id="group-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="group-members">
            Members
          </label>

          <input
            id="group-members"
            type="text"
            value={members}
            onChange={(event) => setMembers(event.target.value)}
            placeholder="Anna, Sara, John"
            required
          />

          <p>Separate names with commas.</p>
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit">
          Create group
        </button>
      </form>
    </section>
  );
}