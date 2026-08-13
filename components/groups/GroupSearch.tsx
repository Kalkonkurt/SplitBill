type GroupSearchProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export default function GroupSearch({
    value,
    onChange,
  }: GroupSearchProps) {
    return (
      <div>
        <label htmlFor="group-search">Search groups</label>
  
        <input
          id="group-search"
          type="search"
          placeholder="Search by group name..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    );
  }