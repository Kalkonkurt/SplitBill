type ErrorAlertProps = {
	message: string;
};

export default function ErrorAlert({ message }: ErrorAlertProps) {
	return (
		<div className="alert alert-error text-sm">
			<span>{message}</span>
		</div>
	);
}
