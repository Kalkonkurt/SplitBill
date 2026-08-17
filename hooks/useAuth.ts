import { useContext } from 'react';
import { AuthUserContext } from '@/context/AuthContext';

export function useAuthUser() {
	const context = useContext(AuthUserContext);
	if (context === undefined) {
		throw new Error('useAuthUser has to be used inside a AuthUserProvider');
	}
	return context;
}
