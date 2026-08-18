type ActiveGroupsCardProps = {
	groups: Array<{ id: string; name: string; net: number }>;
};

export default function ActiveGroupsCard({ groups }: ActiveGroupsCardProps) {
	return (
		<section aria-labelledby="active-groups-title" className="h-full">
			<div className="card w-full h-full bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<h2 id="active-groups-title" className="card-title">
						Active Groups
					</h2>

					{groups.length === 0 ? (
						<p>You are not part of any groups yet.</p>
					) : (
						<ul className="flex flex-col gap-2">
							{groups.map((group) => (
								<li key={group.id} className="flex justify-between border-b border-base-200 pb-1">
									<span>{group.name}</span>
									{group.net === 0 ? (
										<span className="opacity-60">Settled up</span>
									) : (
										<span className={group.net > 0 ? 'text-success font-medium' : 'text-error font-medium'}>
											{group.net > 0 ? '+' : ''}
											{group.net} kr
										</span>
									)}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
}
