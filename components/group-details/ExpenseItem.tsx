type ExpenseItemProps = {
    id: string;
    title: string;
    amount: number;
    paidBy: string;
    category: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  };
  
  export default function ExpenseItem({
    id,
    title,
    amount,
    paidBy,
    category,
    onEdit,
    onDelete,
  }: ExpenseItemProps) {
    return (
      <article>
        <div>
          <h3>{title}</h3>
          <p>{category}</p>
          <p>Paid by {paidBy}</p>
        </div>
  
        <strong>{amount.toFixed(2)} kr</strong>
  
        <div>
          <button type="button" onClick={() => onEdit(id)}>
            Edit
          </button>
  
          <button type="button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </article>
    );
  }