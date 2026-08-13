type SplitPreviewProps = {
    amount: string;
    selectedMembers: string[];
  };
  
  export default function SplitPreview({
    amount,
    selectedMembers,
  }: SplitPreviewProps) {
    const numericAmount = Number(amount);
  
    const amountPerPerson =
      selectedMembers.length > 0 && numericAmount > 0
        ? numericAmount / selectedMembers.length
        : 0;
  
    return (
      <section aria-labelledby="split-preview-title">
        <h2 id="split-preview-title">Split preview</h2>
  
        {selectedMembers.length === 0 ? (
          <p>Select members to see the split.</p>
        ) : (
          <>
            <p>
              {selectedMembers.length}{" "}
              {selectedMembers.length === 1 ? "person" : "people"}
            </p>
  
            <p>
              <strong>{amountPerPerson.toFixed(2)} kr</strong> per person
            </p>
          </>
        )}
      </section>
    );
  }