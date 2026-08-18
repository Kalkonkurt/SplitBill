import { useRouter } from 'next/navigation';
import { useAuthUser } from './useAuth';
import { useCallback } from 'react';

export default function useLogout() {
	const router = useRouter();
	const { clearUser } = useAuthUser();

	const logout = useCallback(async () => {
		try {
			await fetch('/api/logout', { method: 'POST' });
		} finally {
			clearUser();
			router.push('/login');
		}
	}, [clearUser, router]);
	return logout;
}
