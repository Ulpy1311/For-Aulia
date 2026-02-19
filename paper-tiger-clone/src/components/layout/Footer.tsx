'use client';

import React from 'react';
import { DeveloperModal } from '@/components/ui/DeveloperModal';

export function Footer() {
    const [isContactOpen, setIsContactOpen] = React.useState(false);


    return (
        <footer className="bg-background text-foreground px-6 md:px-12 py-20 transition-colors duration-300">
            <div className="max-w-[1800px] mx-auto w-full flex flex-col">
                <div className="w-full mb-12 md:mb-24 flex items-start">
                    <h1 className="font-display uppercase text-[14vw] leading-[0.8] tracking-tight text-foreground/90 select-none">
                        For Aulia
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-12">
                        {['Story', 'Gallery', 'Dreams', 'Changelog'].map((item) => (
                            <a
                                key={item}
                                href={item === 'Changelog' ? '/changelog' : '#'}
                                className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="text-lg md:text-xl font-display uppercase tracking-tight hover:text-muted-foreground transition-colors"
                        >
                            Say Hello
                        </button>
                    </div>
                </div>

                <div className="w-full h-px bg-border my-8 opacity-50" />

                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                    <div>
                        Ngentrong, Campurdarat, Tulungagung, Jawa Timur, Indonesia
                    </div>
                    <div className="flex gap-4">
                        <span>©2026</span>
                        <span>Refining the narrative.</span>
                    </div>
                </div>
            </div>

            <DeveloperModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </footer>
    );
}
