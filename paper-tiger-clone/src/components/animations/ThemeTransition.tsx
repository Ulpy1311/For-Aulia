'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeTransitionContextType {
    toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType>({
    toggleTheme: () => { },
});

export const useThemeTransition = () => useContext(ThemeTransitionContext);

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useTheme();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [nextTheme, setNextTheme] = useState<string | null>(null);
    const [clickPos, setClickPos] = useState<{ x: number, y: number } | null>(null);

    // Ensure we mount only on client to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const toggleTheme = (e?: React.MouseEvent) => {
        const target = theme === 'dark' ? 'light' : 'dark';
        setNextTheme(target);

        if (e) {
            setClickPos({ x: e.clientX, y: e.clientY });
        } else {
            setClickPos(null); // Default to center or corner if no click event
        }

        setIsTransitioning(true);
    };

    const handleAnimationComplete = () => {
        if (nextTheme) {
            setTheme(nextTheme);
            // Wait for theme to apple before removing overlay
            setTimeout(() => {
                setIsTransitioning(false);
                setNextTheme(null);
                setClickPos(null);
            }, 300);
        }
    };

    if (!mounted) {
        return <>{children}</>;
    }

    // Determine initial clip path based on click position or default
    const initialClipPath = clickPos
        ? `circle(0px at ${clickPos.x}px ${clickPos.y}px)`
        : `inset(0 100% 0 0)`; // Fallback to swipe

    const animateClipPath = clickPos
        ? `circle(150vmax at ${clickPos.x}px ${clickPos.y}px)`
        : `inset(0 0 0 0)`;

    // Exit should ideally just fade out if theme is switched underneath, 
    // or reverse clip path to reveal the new theme if overlay WAS the new theme color.
    // Actually, overlay is bg-nextTheme. So clipPath expanding REVEALS the next theme overlay.
    // Underneath is old theme.
    // Once expanded fully (150vmax), screen is full nextTheme color.
    // Then we setTheme(nextTheme). Body background changes to nextTheme.
    // Then we remove overlay. Visual should be seamless.

    return (
        <ThemeTransitionContext.Provider value={{ toggleTheme }}>
            {children}
            <AnimatePresence mode="wait">
                {isTransitioning && nextTheme && (
                    <motion.div
                        key={nextTheme}
                        initial={{ clipPath: initialClipPath }}
                        animate={{ clipPath: animateClipPath }}
                        exit={{ opacity: 0 }} // Fade out after theme switch
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        onAnimationComplete={handleAnimationComplete}
                        className={`fixed inset-0 z-[9999] pointer-events-none ${nextTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#1a1a1a]'}`}
                    // Note: Light theme text is usually dark, background is usually white.
                    // Wait, nextTheme 'light' bg should be white (#ffffff) or paper color.
                    // Dark theme bg is #0a0a0a.
                    />
                )}
            </AnimatePresence>
        </ThemeTransitionContext.Provider>
    );
}
