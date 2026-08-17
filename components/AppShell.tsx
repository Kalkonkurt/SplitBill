'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const navItems = [
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/profile', label: 'Profile' }
];

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-content focus:px-4 focus:py-2 focus:rounded-lg"
			>
				Skip to content
			</a>

			<nav aria-label="Main menu" className="bg-base-200 md:w-56 shrink-0 p-4">
				<ul className="flex md:flex-col gap-2">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<li key={item.href}>
								<Link
									href={item.href}
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
			</nav>

			<main id="main-content" className="flex-1 p-4">
				{children}
			</main>
		</div>
	);
}
