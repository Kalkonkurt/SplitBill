type GroupsHeaderProps = {
    onCreateGroup: () => void;
  };
  
  export default function GroupsHeader({
    onCreateGroup,
  }: GroupsHeaderProps) {
    return (
      <section>
        <div>
          <h1>Groups</h1>
          <p>Manage your shared expenses and balances.</p>
        </div>
  
        <button type="button" onClick={onCreateGroup}>
          + Create group
        </button>
      </section>
    );
  }