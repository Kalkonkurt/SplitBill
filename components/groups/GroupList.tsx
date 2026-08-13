import GroupCard from "./GroupCard";

type Group = {
  _id: string;
  name: string;
  members: string[];
  createdBy: string;
};

type GroupListProps = {
  groups: Group[];
};

export default function GroupList({
  groups,
}: GroupListProps) {
  if (groups.length === 0) {
    return <p>No groups found.</p>;
  }

  return (
    <section aria-label="Group list">
      {groups.map((group) => (
        <GroupCard
          key={group._id}
          id={group._id}
          name={group.name}
          members={group.members}
          createdBy={group.createdBy}
        />
      ))}
    </section>
  );
}