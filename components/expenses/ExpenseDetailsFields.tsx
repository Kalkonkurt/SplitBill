type ExpenseDetailsFieldsProps = {
    title: string;
    amount: string;
    category: string;
    onTitleChange: (value: string) => void;
    onAmountChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
  };
  
  export default function ExpenseDetailsFields({
    title,
    amount,
    category,
    onTitleChange,
    onAmountChange,
    onCategoryChange,
  }: ExpenseDetailsFieldsProps) {
    return (
      <fieldset>
        <legend>Expense details</legend>
  
        <div>
          <label htmlFor="expense-title">Title</label>
          <input
            id="expense-title"
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            required
          />
        </div>
  
        <div>
          <label htmlFor="expense-amount">Amount</label>
          <input
            id="expense-amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            required
          />
        </div>
  
        <div>
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </fieldset>
    );
  }