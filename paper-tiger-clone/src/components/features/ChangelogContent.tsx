import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function ChangelogContent() {
    return (
        <div className="flex flex-col gap-12 w-full max-w-md py-12 md:py-0 sticky top-32 h-fit">
            <div className="flex flex-col gap-4">
                <Link
                    href="/"
                    className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 w-fit mb-4"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to Home
                </Link>

                <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tight text-foreground">
                    Changelog
                </h1>

                <p className="text-lg font-light text-foreground/80 leading-snug mt-4">
                    Tracking my journey building this personal space.
                </p>
            </div>

            {/* Quick Navigation - Stacked Vertical for Sidebar */}
            <div className="flex flex-col gap-4 border-t border-border pt-8">
                <Link
                    href="/story"
                    className="group border border-border p-6 hover:bg-foreground hover:text-background transition-all flex flex-col justify-between h-28"
                >
                    <div className="flex justify-between items-start w-full">
                        <span className="text-xs font-mono uppercase tracking-widest opacity-60">01</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-display text-2xl uppercase tracking-tight">View Story</span>
                </Link>

                <div className="border border-border p-6 opacity-50 cursor-not-allowed flex flex-col justify-between h-28">
                    <div className="flex justify-between items-start w-full">
                        <span className="text-xs font-mono uppercase tracking-widest opacity-60">02</span>
                        <span className="text-[10px] font-mono uppercase border border-foreground/20 px-2 py-0.5 rounded-full">Soon</span>
                    </div>
                    <span className="font-display text-2xl uppercase tracking-tight">Gallery</span>
                </div>

                <div className="border border-border p-6 opacity-50 cursor-not-allowed flex flex-col justify-between h-28">
                    <div className="flex justify-between items-start w-full">
                        <span className="text-xs font-mono uppercase tracking-widest opacity-60">03</span>
                        <span className="text-[10px] font-mono uppercase border border-foreground/20 px-2 py-0.5 rounded-full">Soon</span>
                    </div>
                    <span className="font-display text-2xl uppercase tracking-tight">Dreams</span>
                </div>
            </div>
        </div>
    );
}
