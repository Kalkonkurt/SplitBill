'use client';
import { createContext, useState, useEffect, useCallback } from 'react';

export type AuthUser = {
	userId: string;
	email: string;
	firstName?: string;
	lastName?: string;
	displayName?: string;
	phone?: string;
	createdAt: string;
};

type AuthUserContextType = {
	user: AuthUser | null;
	loading: boolean;
	refetchUser: () => Promise<void>;
	clearUser: () => void;
};

export const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchUser = useCallback(async () => {
		try {
			const res = await fetch('/api/me');
			if (!res.ok) {
				throw new Error('Not logged in when getting user context');
			}
			const data = await res.json();
			setUser(data);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	const clearUser = useCallback(() => {
		setUser(null);
	}, []);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<AuthUserContext.Provider value={{ user, loading, refetchUser: fetchUser, clearUser }}>
			{children}
		</AuthUserContext.Provider>
	);
}
