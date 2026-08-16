import type { ReactNode } from 'react';
type AuthCardProps = {
	title: string;
	children: ReactNode;
};

export default function AuthCard({ title, children }: AuthCardProps) {
	return (
		<main className="flex flex-1 items-center justify-center p-4">
			<div className="card w-full max-w-sm bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<h1 className="card-title">{title}</h1>
					{children}
				</div>
			</div>
		</main>
	);
}
