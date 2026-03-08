'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <div
                style={{
                    opacity: isLoading ? 0 : 1,
                    transition: "opacity 0.5s ease-out",
                    visibility: isLoading ? 'hidden' : 'visible'
                }}
            >
                {children}
            </div>
        </>
    );
}
