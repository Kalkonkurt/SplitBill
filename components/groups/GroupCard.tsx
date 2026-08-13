import Link from "next/link";

type GroupCardProps = {
  id: string;
  name: string;
  members: string[];
  createdBy: string;
};

export default function GroupCard({
  id,
  name,
  members,
  createdBy,
}: GroupCardProps) {
  return (
    <article>
      <h2>{name}</h2>

      <p>Created by: {createdBy}</p>

      <p>
        Members: {members.join(", ")}
      </p>

      <Link href={`/groups/${id}`}>
        View group
      </Link>
    </article>
  );
}