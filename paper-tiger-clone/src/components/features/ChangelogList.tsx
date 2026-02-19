import React from 'react';

const changes = [
    {
        date: 'February 18, 2026',
        version: 'v1.3.0',
        title: 'Refining the Narrative',
        items: [
            'Featured Works: Reimagined Story Page layout with "Page One" typography.',
            'Theme Reveal: Implemented "Shoot" transition originating from cursor click.',
            'Navigation: Added Story, Gallery, and Dreams shortcuts to Right-Click Menu.',
            'Typography: Polished spacing for Navbar ("For Aulia") and headings.',
            'Footer Refinement: Fixed letter tracking and updated copyright.',
        ],
    },
    {
        date: 'February 16, 2026',
        version: 'v1.2.0',
        title: 'Polish & Synchronization',
        items: [
            'Removed Navbar and Footer borders for a floating aesthetic.',
            'Updated Footer location to "Tulungagung, Campurdarat".',
            'Ensured seamless Theme Toggle across all components.',
            'Refined Branding Strategy for "For Aulia".',
        ],
    },
    {
        date: 'February 14, 2026',
        version: 'v1.1.0',
        title: 'Developer Connection',
        items: [
            'Added Developer Contact Modal with clipboard copy.',
            'Integrated Instagram direct link for @youbpyy.',
            'Included personal message about the project\'s purpose.',
            'Established core Design System (Typography, Spacing).',
        ],
    },
    {
        date: 'January 2026',
        version: 'v1.0.0',
        title: 'Initial Launch',
        items: [
            'Official launch of "For Aulia" personal website.',
            'Implemented White/Dark Theme toggle.',
            'Built with Next.js 16, Tailwind 4, and GSAP/Lenis animations.',
        ],
    },
];

export function ChangelogList() {
    return (
        <div className="flex flex-col gap-12 py-12 md:py-0">
            {changes.map((change, index) => (
                <div key={index} className="border-l-2 border-border pl-8 relative ml-3 md:ml-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-foreground transition-colors duration-500" />

                    <div className="flex flex-col mb-4">
                        <span className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                            {change.date} — {change.version}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-foreground">
                            {change.title}
                        </h2>
                    </div>

                    <ul className="space-y-3">
                        {change.items.map((item, i) => (
                            <li key={i} className="text-base text-foreground/80 font-light flex items-start leading-relaxed">
                                <span className="mr-3 text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary block shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
