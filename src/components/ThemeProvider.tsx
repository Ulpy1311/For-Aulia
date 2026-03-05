'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { TEMP_THEME_STORAGE_KEY } from '@/lib/constants';

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    React.useEffect(() => {
        const clearPersistedTheme = () => {
            try {
                window.localStorage.removeItem(TEMP_THEME_STORAGE_KEY);
            } catch {
                // Ignore storage errors (private mode / blocked storage).
            }
        };

        window.addEventListener('beforeunload', clearPersistedTheme);
        window.addEventListener('pagehide', clearPersistedTheme);

        return () => {
            window.removeEventListener('beforeunload', clearPersistedTheme);
            window.removeEventListener('pagehide', clearPersistedTheme);
            clearPersistedTheme();
        };
    }, []);

    return (
        <NextThemesProvider
            storageKey={TEMP_THEME_STORAGE_KEY}
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
