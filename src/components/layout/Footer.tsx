'use client';

import React from 'react';
import Link from 'next/link';
import { DeveloperModal } from '@/components/ui/DeveloperModal';
import { primaryNavItems } from '@/lib/navigation';

export function Footer() {
    const [isContactOpen, setIsContactOpen] = React.useState(false);

    return (
        <footer className="bg-background text-foreground py-20 transition-colors duration-300 font-sans">
            <div className="desktop-shell w-full flex flex-col">
                <div className="w-full mb-12 md:mb-24 flex items-start">
                    <h1 className="font-display uppercase text-[14vw] leading-[0.8] tracking-tight text-foreground/90 select-none">
                        For Aulia
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-12">
                        {primaryNavItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="text-xs font-medium uppercase tracking-wide text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Say Hello
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-border/50 mt-16 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                    <div>Ngentrong, Campurdarat, Tulungagung, Jawa Timur, Indonesia</div>
                    <div className="flex gap-4">
                        <span>(c) 2026</span>
                        <span>Refining the narrative.</span>
                    </div>
                </div>
            </div>

            <DeveloperModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </footer>
    );
}
