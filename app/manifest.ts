import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'SplitBill',
		short_name: 'SplitBill',
		description: 'Split bills and track expenses with your group',
		start_url: '/dashboard',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#0072B2',
		icons: [
			{
				src: '/icon.svg',
				sizes: 'any',
				type: 'image/svg+xml'
			}
		]
	};
}
