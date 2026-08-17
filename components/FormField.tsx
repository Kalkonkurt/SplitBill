import type { ChangeEvent } from 'react';

type FormFieldProps = {
	label: string;
	type: string;
	placeholder: string;
	autoComplete: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	minLength?: number;
	required?: boolean;
	pattern?: string;
	title?: string;
};

export default function FormField({
	label,
	type,
	placeholder,
	autoComplete,
	value,
	onChange,
	minLength,
	required = true,
	pattern,
	title
}: FormFieldProps) {
	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend sr-only">{label}</legend>
			<input
				className="input w-full rounded-2xl"
				type={type}
				required={required}
				placeholder={placeholder}
				autoComplete={autoComplete}
				value={value}
				onChange={onChange}
				minLength={minLength}
				pattern={pattern}
				title={title}
			/>
		</fieldset>
	);
}
