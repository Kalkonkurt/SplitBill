type SubmitButtonProps = {
	isSubmitting: boolean;
	idleText: string;
	loadingText: string;
};

export default function SubmitButton({ isSubmitting, idleText, loadingText }: SubmitButtonProps) {
	return (
		<button type="submit" className="btn btn-primary w-full rounded-2xl mt-2" disabled={isSubmitting}>
			{isSubmitting && <span className="loading loading-spinner" />}
			{isSubmitting ? loadingText : idleText}
		</button>
	);
}
