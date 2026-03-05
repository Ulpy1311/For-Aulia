'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeveloperModal } from '@/components/ui/DeveloperModal';
import { useThemeTransition } from '@/components/animations/ThemeTransition';
import { primaryNavItems } from '@/lib/navigation';

export function Navbar() {
    const { toggleTheme } = useThemeTransition();
    const [isContactOpen, setIsContactOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    // Close on Escape key
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen, handleEscape]);

    return (
        <>
            <nav className="fixed w-full z-40 bg-background/90 backdrop-blur-md transition-colors duration-300 font-sans">
                <div className="desktop-shell h-14 md:h-16 flex items-center justify-between">
                    <Link href="/" className="font-display text-xl md:text-2xl font-bold uppercase tracking-normal text-foreground">
                        For Aulia
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {primaryNavItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-xs font-medium transition-colors uppercase tracking-wide ${pathname === item.href
                                        ? 'text-foreground'
                                        : 'text-foreground/80 hover:text-foreground'
                                    }`}
                            >
                                {item.label}
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
                            className="hidden md:inline-flex border border-foreground/30 px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                        >
                            Contact
                        </button>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-1.5 rounded-full hover:bg-secondary transition-colors"
                            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <X className="h-5 w-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <Menu className="h-5 w-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Slide-in Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-[39] bg-background/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 z-[39] w-[280px] bg-card border-l border-border shadow-2xl md:hidden flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="h-14 flex items-center justify-between px-6 border-b border-border">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                    Menu
                                </span>
                            </div>

                            {/* Nav Links */}
                            <div className="flex-1 py-6 px-6 flex flex-col gap-1">
                                {primaryNavItems.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 + 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block py-3 border-b border-border/50 text-sm font-medium uppercase tracking-wider transition-colors ${pathname === item.href
                                                    ? 'text-foreground'
                                                    : 'text-foreground/70 hover:text-foreground'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Drawer Footer */}
                            <div className="px-6 pb-8 space-y-4">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsContactOpen(true);
                                    }}
                                    className="w-full border border-foreground/30 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                                >
                                    Contact
                                </button>
                                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground text-center">
                                    For Aulia — 2026
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <DeveloperModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}
