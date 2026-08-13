import Link from "next/link";

type ExpenseHeaderProps = {
  groupId?: string;
};

export default function ExpenseHeader({
  groupId,
}: ExpenseHeaderProps) {
  const backLink = groupId ? `/groups/${groupId}` : "/groups";

  return (
    <header>
      <div>
        <Link href={backLink}>← Back</Link>

        <h1>Add expense</h1>
        <p>Add a shared expense and choose who should split the cost.</p>
      </div>
    </header>
  );
}