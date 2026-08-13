type ExpenseActionsProps = {
    onCancel: () => void;
    isSubmitting: boolean;
  };
  
  export default function ExpenseActions({
    onCancel,
    isSubmitting,
  }: ExpenseActionsProps) {
    return (
      <div>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
  
        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save expense"}
        </button>
      </div>
    );
  }