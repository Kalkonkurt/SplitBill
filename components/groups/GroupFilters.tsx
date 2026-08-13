type GroupFiltersProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export default function GroupFilters({
    value,
    onChange,
  }: GroupFiltersProps) {
    return (
      <div>
        <label htmlFor="group-filter">Filter groups</label>
  
        <select
          id="group-filter"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="all">All groups</option>
          <option value="owed">You are owed</option>
          <option value="owe">You owe</option>
          <option value="settled">Settled</option>
        </select>
      </div>
    );
  }