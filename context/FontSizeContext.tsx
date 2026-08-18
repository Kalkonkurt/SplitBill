'use client';
import { createContext, useState, useEffect, useCallback } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

const FONT_SIZE_MAP: Record<FontSize, string> = {
	normal: '100%',
	large: '112.5%',
	xlarge: '125%'
};

const ORDER: FontSize[] = ['normal', 'large', 'xlarge'];

type FontSizeContextType = {
	fontSize: FontSize;
	cycleFontSize: () => void;
};

export const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
	const [fontSize, setFontSize] = useState<FontSize>('normal');

	useEffect(() => {
		const stored = localStorage.getItem('fontSize');
		if (stored === 'normal' || stored === 'large' || stored === 'xlarge') {
			setFontSize(stored);
		}
	}, []);

	useEffect(() => {
		document.documentElement.style.fontSize = FONT_SIZE_MAP[fontSize];
		localStorage.setItem('fontSize', fontSize);
	}, [fontSize]);

	const cycleFontSize = useCallback(() => {
		setFontSize((prev) => {
			const nextIndex = (ORDER.indexOf(prev) + 1) % ORDER.length;
			return ORDER[nextIndex];
		});
	}, []);

	return <FontSizeContext.Provider value={{ fontSize, cycleFontSize }}>{children}</FontSizeContext.Provider>;
}
