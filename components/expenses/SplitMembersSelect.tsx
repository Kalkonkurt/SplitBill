type SplitMembersSelectProps = {
    members: string[];
    selectedMembers: string[];
    onChange: (members: string[]) => void;
  };
  
  export default function SplitMembersSelect({
    members,
    selectedMembers,
    onChange,
  }: SplitMembersSelectProps) {
    function handleMemberChange(member: string) {
      if (selectedMembers.includes(member)) {
        // Remove member
        onChange(
          selectedMembers.filter(
            (selectedMember) => selectedMember !== member
          )
        );
      } else {
        // Add member
        onChange([...selectedMembers, member]);
      }
    }
  
    return (
      <fieldset>
        <legend>Split between</legend>
  
        {members.map((member) => (
          <label key={member}>
            <input
              type="checkbox"
              checked={selectedMembers.includes(member)}
              onChange={() => handleMemberChange(member)}
            />
  
            {member}
          </label>
        ))}
      </fieldset>
    );
  }