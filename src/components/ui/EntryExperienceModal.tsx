'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, MousePointer2, ZoomIn, Smartphone } from 'lucide-react';
import { useUIStore } from '@/lib/store';

type DetectedOS = 'windows' | 'macos' | 'linux' | 'mobile' | 'unknown';

function useDetectedOS(): DetectedOS {
    const [os] = useState<DetectedOS>(() => {
        if (typeof navigator === 'undefined') {
            return 'unknown';
        }

        const ua = navigator.userAgent.toLowerCase();
        if (/android|iphone|ipad|ipod|mobile/i.test(ua)) {
            return 'mobile';
        }
        if (ua.includes('mac')) {
            return 'macos';
        }
        if (ua.includes('linux')) {
            return 'linux';
        }
        return 'windows';
    });

    return os;
}

function WindowsLogo() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
                d="M2 4.2 10.7 3v8.3H2V4.2Zm9.8-1.3L22 1.5v9.8h-10.2V2.9ZM2 12.6h8.7v8.3L2 19.7v-7.1Zm9.8 0H22v9.8l-10.2-1.4v-8.4Z"
                fill="currentColor"
            />
        </svg>
    );
}

function AppleLogo() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    );
}

export function EntryExperienceModal() {
    const [isOpen, setIsOpen] = useState(true);
    const setEntryDismissed = useUIStore((s) => s.setEntryDismissed);
    const detectedOS = useDetectedOS();

    const handleDismiss = useCallback(() => {
        setEntryDismissed();
        setIsOpen(false);
    }, [setEntryDismissed]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleDismiss();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, handleDismiss]);

    const isMobile = detectedOS === 'mobile';

    const scaleInstructions = useMemo(() => {
        if (isMobile) return null;

        const primary = {
            windows: {
                label: 'Option 1 (Recommended)',
                icon: <WindowsLogo />,
                text: 'Open Windows Settings and set display scale to 100%.',
                steps: ['Win + I', 'System', 'Display', 'Scale 100%'],
                hint: 'If your current value is 125% or 150%, lower it to 100%.',
            },
            macos: {
                label: 'Option 1 (Recommended)',
                icon: <AppleLogo />,
                text: 'Open System Settings and set display resolution to Default.',
                steps: ['Cmd + Space', 'Display Settings', 'Resolution', 'Default'],
                hint: 'Choose "Default for display" or a higher resolution for more space.',
            },
            linux: {
                label: 'Option 1 (Recommended)',
                icon: <Monitor className="h-4 w-4" />,
                text: 'Open Display Settings and set scaling to 100%.',
                steps: ['Settings', 'Displays', 'Scale', '100%'],
                hint: 'In GNOME, go to Settings > Displays > Scale.',
            },
            unknown: {
                label: 'Option 1 (Recommended)',
                icon: <Monitor className="h-4 w-4" />,
                text: 'Set your system display scale to 100% for the best experience.',
                steps: [],
                hint: 'Check your system display settings.',
            },
        };

        return primary[detectedOS] || primary.unknown;
    }, [detectedOS, isMobile]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1200] bg-background/70 backdrop-blur-md"
                    />

                    <div className="fixed inset-0 z-[1201] grid place-items-center p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.96 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="w-[min(92vw,880px)] md:w-[58vw] lg:w-[52vw] max-w-[880px] rounded-2xl border-2 border-border bg-card/95 text-card-foreground shadow-2xl overflow-hidden"
                        >
                            <div className="px-5 md:px-7 py-3 border-b border-border bg-muted/30 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                                    {isMobile ? 'Welcome' : 'Display Guide'}
                                </span>
                            </div>

                            <div className="p-5 md:p-7 border-b border-border">
                                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-2">
                                    Before You Explore
                                </p>
                                <h2 className="font-display uppercase tracking-tight text-2xl md:text-4xl leading-[0.95]">
                                    {isMobile ? 'Welcome To This Space' : 'Set Your Scale For The Best View'}
                                </h2>
                                <p className="mt-4 font-serif text-sm md:text-base leading-relaxed text-muted-foreground">
                                    {isMobile
                                        ? 'This experience is crafted with care. For the best visual flow and typography, we recommend viewing on a desktop browser. But feel free to explore here — the story remains the same.'
                                        : 'To get the intended visual flow, typography rhythm, and page composition, it is recommended to use 100% display scale.'
                                    }
                                </p>
                            </div>

                            {!isMobile && scaleInstructions && (
                                <div className="p-5 md:p-7 space-y-4">
                                    <div className="rounded-xl border-2 border-border/80 bg-background/60 p-4 md:p-5">
                                        <div className="flex items-start gap-3">
                                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border-2 border-border bg-background text-foreground">
                                                {scaleInstructions.icon}
                                            </span>
                                            <div>
                                                <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1">
                                                    {scaleInstructions.label}
                                                </p>
                                                <p className="text-sm md:text-[15px] leading-relaxed">
                                                    {scaleInstructions.text}
                                                </p>
                                                {scaleInstructions.steps.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                                                        {scaleInstructions.steps.map((step, i) => (
                                                            <span key={step}>
                                                                {i > 0 && <span className="text-muted-foreground mr-2">&gt;</span>}
                                                                <span className="rounded-md border border-border px-2 py-1">{step}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    {scaleInstructions.hint}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-xl border-2 border-border/80 bg-background/60 p-4 md:p-5">
                                        <div className="flex items-start gap-3">
                                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border-2 border-border bg-background">
                                                <ZoomIn className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1">
                                                    Option 2 (Browser Zoom)
                                                </p>
                                                <p className="text-sm md:text-[15px] leading-relaxed">
                                                    If you do not want to change system settings, hold <strong>Ctrl</strong> and
                                                    scroll to adjust browser zoom until the viewport feels right.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isMobile && (
                                <div className="p-5 md:p-7">
                                    <div className="rounded-xl border-2 border-border/80 bg-background/60 p-4 md:p-5">
                                        <div className="flex items-start gap-3">
                                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border-2 border-border bg-background">
                                                <Smartphone className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1">
                                                    Mobile Experience
                                                </p>
                                                <p className="text-sm md:text-[15px] leading-relaxed">
                                                    Hold your phone in portrait mode for the best reading experience.
                                                    Some visual effects are optimized for larger screens.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="p-5 md:p-7 pt-0 flex items-center justify-between gap-3">
                                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.13em] text-muted-foreground">
                                    <MousePointer2 className="h-3.5 w-3.5" />
                                    Ready to explore
                                </div>
                                <button
                                    onClick={handleDismiss}
                                    className="inline-flex items-center justify-center rounded-lg border-2 border-foreground px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.16em] text-foreground hover:bg-foreground hover:text-background transition-colors"
                                >
                                    I Understand
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

