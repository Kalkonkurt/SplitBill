'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import useLogout from '@/hooks/useLogout';

const navItems = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/profile', label: 'Profile' }
];

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleLogout = useLogout();

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-content focus:px-4 focus:py-2 focus:rounded-lg"
			>
				Skip to content
			</a>

			<div className="md:hidden flex items-center justify-between bg-base-200 p-4">
				<span className="font-bold">SplitBill</span>
				<button
					type="button"
					onClick={() => setIsMenuOpen((open) => !open)}
					aria-expanded={isMenuOpen}
					aria-controls="main-nav-links"
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="btn btn-ghost btn-sm"
				>
					{isMenuOpen ? '✕' : '☰'}
				</button>
			</div>

			<nav
				aria-label="Main menu"
				className="bg-base-200 md:w-56 shrink-0 p-4 flex flex-col md:min-h-screen"
			>
				<span className="hidden md:block font-bold text-lg mb-4">SplitBill</span>

				<div
					id="main-nav-links"
					className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col gap-4 md:flex md:flex-1`}
				>
					<ul className="flex flex-col gap-2">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<li key={item.href}>
									<Link
										href={item.href}
										onClick={() => setIsMenuOpen(false)}
										aria-current={isActive ? 'page' : undefined}
										className={`block rounded-lg px-4 py-2 font-medium ${
											isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'
										}`}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>

					<button
						type="button"
						onClick={handleLogout}
						className="btn btn-ghost rounded-lg md:mt-auto"
					>
						Log out
					</button>

					<footer className="text-xs md:text-sm opacity-70 text-center">© 2026 SplitBill</footer>
				</div>
			</nav>

			<main id="main-content" className="flex-1 p-4">
				{children}
			</main>
		</div>
	);
}
