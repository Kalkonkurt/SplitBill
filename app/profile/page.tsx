'use client';

import { useRef } from 'react';
import AppShell from '@/components/AppShell';
import ProfileInfoCard from '@/components/profile/ProfileInfoCard';
import ProfileCard from '@/components/profile/ProfileCard';
import MyExpensesCard from '@/components/profile/MyExpensesCard';
import { useAuthUser } from '@/hooks/useAuth';

export default function ProfilePage() {
	const { user, loading } = useAuthUser();
	const editDialogRef = useRef<HTMLDialogElement>(null);

	return (
		<AppShell>
			<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">My Profile</h1>
			{loading || !user ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
						<ProfileInfoCard user={user} onEditClick={() => editDialogRef.current?.showModal()} />
						<MyExpensesCard user={user} />
					</div>

					<dialog ref={editDialogRef} className="modal">
						<div className="modal-box">
							<form method="dialog">
								<button
									className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
									aria-label="Close"
								>
									✕
								</button>
							</form>
							<ProfileCard user={user} onSuccess={() => editDialogRef.current?.close()} />
						</div>
						<form method="dialog" className="modal-backdrop">
							<button aria-label="Close">close</button>
						</form>
					</dialog>
				</>
			)}
		</AppShell>
	);
}
