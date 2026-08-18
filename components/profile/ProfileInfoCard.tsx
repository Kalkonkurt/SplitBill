import type { AuthUser } from '@/context/AuthContext';

type ProfileInfoCardProps = {
	user: AuthUser;
	onEditClick: () => void;
};

export default function ProfileInfoCard({ user, onEditClick }: ProfileInfoCardProps) {
	const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
	const initials = (user.firstName?.[0] ?? user.email[0]).toUpperCase();

	return (
		<section aria-labelledby="my-info-title" className="h-full">
			<div className="card w-full h-full bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<div className="flex items-center justify-between">
						<h2 id="my-info-title" className="card-title">
							My Info
						</h2>
						<button type="button" onClick={onEditClick} className="btn btn-sm btn-outline rounded-2xl">
							Edit
						</button>
					</div>

					{user.avatarUrl ? (
						<img
							src={user.avatarUrl}
							alt={`${fullName || user.email}'s profile picture`}
							className="w-20 h-20 rounded-full object-cover self-start"
						/>
					) : (
						<div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold self-start">
							{initials}
						</div>
					)}

					<dl className="flex flex-col gap-3">
						<div>
							<dt className="text-sm opacity-60">Email</dt>
							<dd>{user.email}</dd>
						</div>
						<div>
							<dt className="text-sm opacity-60">Name</dt>
							<dd>{fullName || 'Not set'}</dd>
						</div>
						<div>
							<dt className="text-sm opacity-60">Display name</dt>
							<dd>{user.displayName || 'Not set'}</dd>
						</div>
						<div>
							<dt className="text-sm opacity-60">Phone</dt>
							<dd>{user.phone || 'Not set'}</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
