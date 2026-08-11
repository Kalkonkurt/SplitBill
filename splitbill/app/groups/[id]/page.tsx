type GroupPageProps = {
	params: Promise<{ id: string }>;
};

export default async function GroupPage({ params }: GroupPageProps) {
	const { id } = await params;

	return (
		<main>
			<h1>Grupp: {id}</h1>
		</main>
	);
}
