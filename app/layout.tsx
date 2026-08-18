import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthUserProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FontSizeProvider } from '@/context/FontSizeContext';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'SplitBill',
	description: 'Split bills and track expenses with your group'
};

export const viewport: Viewport = {
	themeColor: '#0072B2'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<ServiceWorkerRegister />
				<ThemeProvider>
					<FontSizeProvider>
						<AuthUserProvider>{children}</AuthUserProvider>
					</FontSizeProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
