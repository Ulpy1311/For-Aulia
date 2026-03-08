import React from 'react';

const changes = [
    {
        date: 'March 8, 2026',
        version: 'v3.2.0',
        title: 'Universal Asset Discovery & Preloading',
        items: [
            'Implemented automated asset discovery across all components (Story, Music, Gallery, Public).',
            'Integrated deep preloading for external Unsplash, Genius, and Cosmos media sources.',
            'Optimized the loader to wait for full project hydration, ensuring zero-latency transitions.',
            'Updated README with final technical architecture and performance strategy.',
        ],
    },
    {
        date: 'March 8, 2026',
        version: 'v3.1.0',
        title: 'Premium "Engineer-Style" Loader',
        items: [
            'Created a high-fidelity loading experience with technical diagnostic aesthetics.',
            'Added smooth progress interpolation (000-100) using spring physics.',
            'Implemented a real-time Asset Terminal to log every file path being cached.',
            'Designed blueprint grid backgrounds and scanning line effects for a premium feel.',
            'Enforced a 5.5s cinematic duration to ensure visual immersion.',
        ],
    },
    {
        date: 'March 6, 2026',
        version: 'v3.0.0',
        title: 'Premium UX Overhaul & English Migration',
        items: [
            'Remade the Music Player with a premium glassmorphism design, advanced playback controls, and smooth realtime feedback.',
            'Implemented a permanent English-first localization strategy, removing the global language toggle for a cleaner UI.',
            'Redesigned the Notes system to display humanized Indonesian translations inline, ensuring an intimate and natural reading experience.',
            'Optimized the expanded and collapsed player states with high-performance animations (RAF) and better volume scaling.',
        ],
    },

    {
        date: 'March 5, 2026',
        version: 'v2.5.0',
        title: 'Global UI Standardization & Navigation',
        items: [
            'Standardized back button navigation across all routes with a unified BackToHomeLink component.',
            'Fixed React list key sequence warnings across dynamic content arrays.',
            'Refined Notes detail and index layout navigation UX to feel native and responsive.',
        ],
    },
    {
        date: 'March 5, 2026',
        version: 'v2.4.0',
        title: 'WebGL Wave Animation Rewrite & Cleanup',
        items: [
            'Rewrote RevealWaveImage component from scratch to fix object-fit scaling issues.',
            'Integrated 80-frame scroll sequence directly into the RevealWave shader for better performance.',
            'Removed obsolete ScrollSequence component, cleaning up duplicate WebGL logic.',
            'Updated Demo and Home page to use the newly unified Wave Image component.',
        ],
    },
    {
        date: 'March 5, 2026',
        version: 'v2.3.0',
        title: 'Codebase Cleanup & Dependency Sync',
        items: [
            'Consolidated repeated navigation/link logic into shared modules to reduce duplication.',
            'Removed unused UI store state and centralized shared constants used by theme providers.',
            'Removed unused AI dependencies and redundant app head icon declarations.',
            'Updated dependencies to latest compatible versions and pinned ESLint 9 for stable linting.',
            'Synced build/lint tooling and documentation with the current active routes.',
        ],
    },
    {
        date: 'March 4, 2026',
        version: 'v2.2.0',
        title: 'Animation & Music Enhancements',
        items: [
            'Rebuilt scroll sequence animations with smooth WebGL cross-fade transitions.',
            'Added responsive object-fit scaling to gallery wave images.',
            'Added "Donne Maula - Bercinta Lewat Kata" as the opening track in the music player.',
            'Refined project documentation and changelog formatting.',
        ],
    },
    {
        date: 'February 26, 2026',
        version: 'v2.1.1',
        title: 'Project Config Renaming',
        items: [
            'Updated project configs and scripts to properly use the "For Aulia" namespace.',
            'Removed all remaining references to legacy clone names in package files.',
        ],
    },
    {
        date: 'February 24, 2026',
        version: 'v2.1.0',
        title: 'Notes Page Rewrite',
        items: [
            'Renamed Dreams page to Notes with new /notes route across the entire website.',
            'Rewrote bilingual content (EN/ID) with a new emotional arc from happiness through longing to quiet hope.',
            'Cleaned up UI removing decorative symbols for a more elegant, typography-focused reading experience.',
            'Updated all navigation references: Navbar, Footer, Context Menu, and Changelog quick links.',
        ],
    },
    {
        date: 'February 22, 2026',
        version: 'v2.0.0',
        title: 'Full English Localization',
        items: [
            'Localized all page copy, popups, story content, and narrative blocks into English.',
            'Rewrote emotional text to sound human, clear, modern, and easy to follow.',
            'Updated story dataset (30 entries) so card previews and detail modals are fully English.',
            'Added README handoff notes for easier project continuation and setup.',
        ],
    },
    {
        date: 'February 22, 2026',
        version: 'v1.9.0',
        title: 'Notes Long-Text Pass',
        items: [
            'Extended Notes narrative into a much longer emotional long-form reading experience.',
            'Improved paragraph pacing so readers can follow the story arc from tension to acceptance.',
            'Kept language humanized and intimate while maintaining a cleaner professional structure.',
        ],
    },
    {
        date: 'February 22, 2026',
        version: 'v1.8.0',
        title: 'Notes Narrative Expansion',
        items: [
            'Refined landing copy by removing slang and improving emotional tone clarity.',
            'Rebuilt Notes page into a structured long-form narrative with stronger readability.',
            'Upgraded Notes visual hierarchy to match the aesthetic direction of landing and story pages.',
            'Added a more humanized emotional flow with clear paragraph pacing and punctuation rhythm.',
        ],
    },
    {
        date: 'February 22, 2026',
        version: 'v1.7.0',
        title: 'Audio Reliability & Security Hardening',
        items: [
            'Updated Music Player default volume to 30% and improved autoplay boot behavior.',
            'Reordered playlist and inserted new track as track #2.',
            'Improved end-of-track behavior so playback continues to the next song automatically.',
            'Added global security headers (CSP, frame/content/referrer/permission protections).',
            'Hardened memory-chat API with input sanitization, stricter payload checks, and rate limiting.',
        ],
    },
    {
        date: 'February 22, 2026',
        version: 'v1.6.0',
        title: 'Story UI Balance & Detail Modal',
        items: [
            'Refined Story left-column typography to match landing-page aesthetic direction.',
            'Expanded Story memories from 12 to 30 entries with broader emotional timeline.',
            'Added click-to-open detail modal on each Story card (blur backdrop, balanced 2px border).',
            'Adjusted landing paragraph spacing/tone and tightened emotion tags for cleaner rhythm.',
            'Removed default opening text from Our Story Space and cleaned panel border style.',
        ],
    },
    {
        date: 'February 22, 2026',
        version: 'v1.5.0',
        title: 'Landing Patch: Emotion Labels',
        items: [
            'Rewrote landing copy to feel more human, direct, and less dramatic.',
            'Replaced "Related Clients" with an emotion label section and price-tag concept.',
            'Added balanced wording for joy, grief, conflict, and relief.',
            'Prepared content direction for deeper expansion in Story and Notes.',
        ],
    },
    {
        date: 'February 21, 2026',
        version: 'v1.4.0',
        title: 'Massive Expansions & Native Feel',
        items: [
            'Added core pages with dynamic layouts.',
            'Enhanced landing page with advanced GSAP and Framer Motion image transitions.',
            'Refined Custom Cursor into lightweight, CSS-driven native MacOS styles.',
            'Upgraded typography with modern fonts via Inter and JetBrains Mono.',
            'Polished Footer layout and separated content with a sleek full-width divider.',
        ],
    },
    {
        date: 'February 18, 2026',
        version: 'v1.3.0',
        title: 'Refining the Narrative',
        items: [
            'Featured Works reimagined Story Page layout with "Page One" typography.',
            'Theme Reveal implemented "Shoot" transition originating from cursor click.',
            'Navigation added Story, Gallery, and Notes shortcuts to Right-Click Menu.',
            'Typography polished spacing for Navbar ("For Aulia") and headings.',
            'Footer Refinement fixed letter tracking and updated copyright.',
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
        <div className="flex flex-col gap-6 py-12 md:py-0">
            {changes.map((change, index) => (
                <div
                    key={index}
                    className="group border-2 border-border/80 rounded-xl bg-card/95 p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden"
                >
                    {/* Version badge */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-foreground/30 group-hover:bg-foreground transition-colors" />
                            {change.date}
                        </span>
                        <span className="bg-secondary px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-secondary-foreground rounded-full">
                            {change.version}
                        </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-display uppercase tracking-tight text-foreground mb-4">
                        {change.title}
                    </h2>

                    <ul className="space-y-2.5 border-t border-border/50 pt-4">
                        {change.items.map((item, i) => (
                            <li key={i} className="font-serif text-sm text-foreground/75 flex items-start leading-relaxed">
                                <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/30 block shrink-0" />
                                <span className="block [text-align:justify]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
