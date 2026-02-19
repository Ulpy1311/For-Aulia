'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { DeveloperModal } from '@/components/ui/DeveloperModal';
import { useThemeTransition } from '@/components/animations/ThemeTransition';

export function Navbar() {
    const { toggleTheme } = useThemeTransition();
    const { theme } = useTheme();
    const [isContactOpen, setIsContactOpen] = React.useState(false);

    return (
        <>
            <nav className="fixed w-full z-40 bg-background/90 backdrop-blur-sm transition-colors duration-300 border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
                    <Link href="/" className="font-display text-xl md:text-2xl font-bold uppercase tracking-normal text-foreground">
                        For Aulia
                    </Link>

                    <div className="hidden md:flex space-x-6 items-center">
                        {['Story', 'Gallery', 'Dreams', 'Changelog'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Changelog' ? '/changelog' : item === 'Story' ? '/story' : '#'}
                                className="text-xs font-medium text-foreground/80 hover:text-foreground transition-colors uppercase tracking-wide"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={toggleTheme}
                            className="p-1.5 rounded-full hover:bg-secondary transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            <Sun className="h-4 w-4 dark:hidden" />
                            <Moon className="h-4 w-4 hidden dark:block" />
                        </button>
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="border border-foreground px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </nav>

            <DeveloperModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}
