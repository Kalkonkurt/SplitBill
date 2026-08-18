type BalanceOverviewCardProps = {
	owed: number;
	owing: number;
	net: number;
};

export default function BalanceOverviewCard({ owed, owing, net }: BalanceOverviewCardProps) {
	const total = owed + owing;
	const owingPercent = total > 0 ? (owing / total) * 100 : 0;
	const owedPercent = total > 0 ? (owed / total) * 100 : 0;

	return (
		<section aria-labelledby="balance-overview-title" className="h-full">
			<div className="card w-full h-full bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<h2 id="balance-overview-title" className="card-title">
						Balance Overview
					</h2>

					<div className="flex justify-between gap-4">
						<div>
							<p className="text-sm opacity-60">You owe</p>
							<p className="text-2xl font-bold text-error">{owing} kr</p>
						</div>
						<div className="text-right">
							<p className="text-sm opacity-60">Owed to you</p>
							<p className="text-2xl font-bold text-success">{owed} kr</p>
						</div>
					</div>

					{total > 0 ? (
						<div
							className="flex h-3 w-full gap-0.5 mt-2"
							role="img"
							aria-label={`You owe ${owing} kr, owed to you ${owed} kr`}
						>
							<div className="h-full bg-error rounded-l-full" style={{ width: `${owingPercent}%` }} />
							<div className="h-full bg-success rounded-r-full" style={{ width: `${owedPercent}%` }} />
						</div>
					) : (
						<div className="h-3 w-full bg-base-200 rounded-full mt-2" />
					)}

					<p className={`text-sm font-medium mt-2 ${net >= 0 ? 'text-success' : 'text-error'}`}>
						Net: {net >= 0 ? '+' : ''}
						{net} kr
					</p>
				</div>
			</div>
		</section>
	);
}
