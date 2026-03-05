'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import Link from 'next/link';
import { notes } from '@/lib/notes';
import { ArrowUpRight, Languages } from 'lucide-react';
import { NOTES_LANGUAGE_STORAGE_KEY } from '@/lib/constants';

export default function NotesIndexPage() {
    const [lang, setLang] = useState<'EN' | 'ID'>(() => {
        if (typeof window === 'undefined') {
            return 'EN';
        }

        try {
            const storedLang = window.localStorage.getItem(NOTES_LANGUAGE_STORAGE_KEY);
            return storedLang === 'ID' ? 'ID' : 'EN';
        } catch {
            return 'EN';
        }
    });

    const toggleLanguage = () => {
        const nextLang = lang === 'EN' ? 'ID' : 'EN';
        setLang(nextLang);

        try {
            window.localStorage.setItem(NOTES_LANGUAGE_STORAGE_KEY, nextLang);
        } catch {
            // Ignore storage errors (private mode / blocked storage).
        }
    };

    const leftContent = (
        <div className="flex flex-col gap-6 w-full max-w-md py-12 md:py-0 sticky top-24 h-fit">
            <BackToHomeLink />

            <button
                onClick={toggleLanguage}
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 transition-colors hover:border-foreground hover:bg-foreground"
            >
                <Languages className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-background" />
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/80 transition-colors group-hover:text-background">
                    {lang === 'EN' ? 'Baca ID' : 'Read EN'}
                </span>
            </button>

            <h1 className="uppercase text-foreground max-w-[13ch] mt-4">
                <span className="block font-mono text-[10px] md:text-xs tracking-[0.38em] text-muted-foreground mb-2 md:mb-3">
                    FOR AULIA
                </span>
                <span className="block font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.83] tracking-[-0.01em]">
                    ALL
                </span>
                <span className="block font-serif italic text-[clamp(2.05rem,6.8vw,3.9rem)] leading-[0.95] tracking-[0.08em] text-foreground/85 -mt-1 md:-mt-2">
                    NOTES
                </span>
            </h1>

            <div className="space-y-5 mt-4">
                <p className="font-serif text-lg md:text-xl text-foreground/75 leading-relaxed">
                    {lang === 'EN'
                        ? 'A collection of notes that records silence after silence. Read slowly and follow the words that were once difficult to say directly.'
                        : 'Kumpulan catatan yang merekam keheningan demi keheningan. Baca dengan pelan, dan ikuti kata-kata yang dulu sulit diucapkan secara langsung.'}
                </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 mt-2">
                <span className="bg-secondary px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-secondary-foreground">
                    21 Notes
                </span>
                <span className="bg-secondary px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-secondary-foreground">
                    Feb - Mar 2026
                </span>
            </div>
        </div>
    );

    const rightContent = (
        <div className="flex flex-col gap-4 pb-28 pt-8 md:pt-0">
            {notes.map((note) => (
                <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href={`/notes/${note.id}`} className="group block outline-none">
                        <article className="rounded-[1.4rem] border border-border/50 bg-card/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-card/70 hover:shadow-[0_18px_48px_rgba(0,0,0,0.08)] md:p-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-[92px,1fr] md:gap-6">
                                <div className="flex items-center justify-between md:flex-col md:items-start md:justify-start md:gap-3">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border/60 bg-background/70 transition-colors group-hover:border-foreground/30 group-hover:bg-background">
                                        <span className="font-display text-[2.7rem] leading-none tracking-[-0.03em] text-foreground/90">
                                            {note.id.padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="text-right md:text-left">
                                        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                                            Note
                                        </p>
                                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60">
                                            Entry {note.id.padStart(2, '0')}
                                        </p>
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                                            {note.date}
                                        </span>
                                        <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/35 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                                    </div>

                                    <h2 className="mb-3 max-w-[24ch] font-serif italic text-[1.35rem] leading-[1.08] text-foreground/92 md:text-[1.7rem]">
                                        {note.content[lang].title}
                                    </h2>

                                    <div className="relative overflow-hidden rounded-xl border border-border/35 bg-background/35 px-4 py-3.5">
                                        <p className="font-serif text-[15px] leading-[1.78] text-foreground/60 line-clamp-4 blur-[0.9px] transition-all duration-300 group-hover:blur-[0.2px] group-hover:text-foreground/72 [text-align:justify]">
                                            {note.content[lang].paragraphs[0]}
                                        </p>
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/95 to-transparent" />
                                    </div>

                                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/40 pt-3">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                                            {lang === 'EN' ? 'Private writing' : 'Catatan pribadi'}
                                        </span>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70 transition-colors group-hover:text-foreground">
                                            {lang === 'EN' ? 'Open note' : 'Buka note'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                </motion.div>
            ))}
        </div>
    );

    return (
        <main className="page-shell">
            <SplitLayout leftContent={leftContent} rightContent={rightContent} />
        </main>
    );
}
