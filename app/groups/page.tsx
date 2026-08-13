"use client";

import { useEffect, useMemo, useState } from "react";
import GroupsHeader from "@/components/groups/GroupsHeader";
import GroupsSummary from "@/components/groups/GroupsSummary";
import GroupSearch from "@/components/groups/GroupSearch";
import GroupFilters from "@/components/groups/GroupFilters";
import GroupList from "@/components/groups/GroupList";
import CreateGroupForm from "@/components/groups/CreateGroupForm";

type Group = {
  _id: string;
  name: string;
  members: string[];
  createdBy: string;
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch("/api/groups");

        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }

        const data = await response.json();

        setGroups(data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGroups();
  }, []);

  // Search and filter groups
  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchesSearch = group.name
        .toLowerCase()
        .includes(search.toLowerCase());

      if (filter === "all") {
        return matchesSearch;
      }

      // Balance filtering will be added later
      return matchesSearch;
    });
  }, [groups, search, filter]);

  function handleCreateGroup() {
    setShowCreateForm(true);
  }

  return (
    <main>
      <GroupsHeader onCreateGroup={handleCreateGroup} />

      {showCreateForm && <CreateGroupForm onGroupCreated={function (): void {
			  throw new Error("Function not implemented.");
		  } } onCancel={function (): void {
			  throw new Error("Function not implemented.");
		  } } />}

      <GroupsSummary
        totalGroups={groups.length}
        youOwe={0}
        youAreOwed={0}
      />

      <GroupSearch
        value={search}
        onChange={setSearch}
      />

      <GroupFilters
        value={filter}
        onChange={setFilter}
      />

      {loading ? (
        <p>Loading groups...</p>
      ) : (
        <GroupList groups={filteredGroups} />
      )}
    </main>
  );
}