type MembersListProps = {
    members: string[];
  };
  
  export default function MembersList({
    members,
  }: MembersListProps) {
    return (
      <section aria-labelledby="members-title">
        <h2 id="members-title">Members</h2>
  
        <ul>
          {members.map((member) => (
            <li key={member}>
              {member}
            </li>
          ))}
        </ul>
      </section>
    );
  }