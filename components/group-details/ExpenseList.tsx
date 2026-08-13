import ExpenseItem from "./ExpenseItem";

type Expense = {
  _id: string;
  title: string;
  amount: number;
  paidBy: string;
  category: string;
};

type ExpenseListProps = {
  expenses: Expense[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseList({
  expenses,
  onEdit,
  onDelete,
}: ExpenseListProps) {
  return (
    <section aria-labelledby="expenses-title">
      <h2 id="expenses-title">Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <div>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense._id}
              id={expense._id}
              title={expense.title}
              amount={expense.amount}
              paidBy={expense.paidBy}
              category={expense.category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}