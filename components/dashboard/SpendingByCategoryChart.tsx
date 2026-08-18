'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CATEGORY_COLORS = ['#0072B2', '#E69F00', '#009E73', '#CC79A7', '#F0E442', '#56B4E9', '#D55E00'];

type SpendingByCategoryChartProps = {
	data: Array<{ category: string; amount: number }>;
};

export default function SpendingByCategoryChart({ data }: SpendingByCategoryChartProps) {
	return (
		<section aria-labelledby="spending-by-category-title" className="h-full">
			<div className="card w-full h-full bg-base-100 shadow-xl">
				<div className="card-body p-8">
					<h2 id="spending-by-category-title" className="card-title">
						Spending by Category
					</h2>

					{data.length === 0 ? (
						<p>No spending data yet.</p>
					) : (
						<div className="max-w-xs mx-auto">
							<Doughnut
								data={{
									labels: data.map((d) => d.category),
									datasets: [
										{
											data: data.map((d) => d.amount),
											backgroundColor: data.map((_, i) => CATEGORY_COLORS[i % CATEGORY_COLORS.length])
										}
									]
								}}
								options={{
									plugins: {
										legend: { position: 'bottom' }
									}
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
