type RecentActivityCardProps = {
	activity: Array<{ id: string; title: string; amount: number; createdAt: string }>;
};

export default function RecentActivityCard({ activity }: RecentActivityCardProps) {
	return (
		<section aria-labelledby="recent-activity-title" className="h-full">
			<div className="card w-full h-full bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<h2 id="recent-activity-title" className="card-title">
						Recent Activity
					</h2>

					{activity.length === 0 ? (
						<p>No recent activity.</p>
					) : (
						<ul className="flex flex-col gap-2">
							{activity.map((item) => (
								<li key={item.id} className="flex justify-between border-b border-base-200 pb-1">
									<span>{item.title}</span>
									<span className="flex flex-col items-end">
										<span>{item.amount} kr</span>
										<span className="text-xs opacity-60">
											{new Date(item.createdAt).toLocaleDateString()}
										</span>
									</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
}
