type PaidBySelectProps = {
    members: string[];
    paidBy: string;
    onChange: (value: string) => void;
  };
  
  export default function PaidBySelect({
    members,
    paidBy,
    onChange,
  }: PaidBySelectProps) {
    return (
      <div>
        <label htmlFor="paid-by">Who paid?</label>
  
        <select
          id="paid-by"
          value={paidBy}
          onChange={(event) => onChange(event.target.value)}
          required
        >
          <option value="">Select member</option>
  
          {members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
      </div>
    );
  }