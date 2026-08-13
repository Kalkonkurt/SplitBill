import Link from "next/link";

type GroupDetailsHeaderProps = {
  groupName: string;
  groupId: string;
};

export default function GroupDetailsHeader({
  groupName,
  groupId,
}: GroupDetailsHeaderProps) {
  return (
    <header>
      <div>
        <Link href="/groups">
          ← Back to groups
        </Link>

        <h1>{groupName}</h1>
      </div>

      <Link href={`/expenses/new?groupId=${groupId}`}>
        + Add expense
      </Link>
    </header>
  );
}