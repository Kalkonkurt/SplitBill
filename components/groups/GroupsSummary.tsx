type GroupsSummaryProps = {
    totalGroups: number;
    youOwe: number;
    youAreOwed: number;
  };
  
  export default function GroupsSummary({
    totalGroups,
    youOwe,
    youAreOwed,
  }: GroupsSummaryProps) {
    return (
      <section aria-label="Groups summary">
        <div>
          <p>Total groups</p>
          <strong>{totalGroups}</strong>
        </div>
  
        <div>
          <p>You owe</p>
          <strong>{youOwe} kr</strong>
        </div>
  
        <div>
          <p>You are owed</p>
          <strong>{youAreOwed} kr</strong>
        </div>
      </section>
    );
  }