'use client';

import React, { useState } from 'react';
import { Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import { Note } from '@/lib/notes';
import { NOTES_LANGUAGE_STORAGE_KEY } from '@/lib/constants';

export default function NoteDetailClient({ note }: { note: Note }) {
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
    const currentContent = note.content[lang];

    const toggleLanguage = () => {
        const nextLang = lang === 'EN' ? 'ID' : 'EN';
        setLang(nextLang);

        try {
            window.localStorage.setItem(NOTES_LANGUAGE_STORAGE_KEY, nextLang);
        } catch {
            // Ignore storage errors (private mode / blocked storage).
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
            <section className="mx-auto w-full max-w-[1220px] px-6 pb-20 pt-[calc(var(--nav-height)+1.7rem)] md:px-10 md:pb-28 md:pt-[calc(var(--nav-height)+2.4rem)]">
                <div className="flex items-center justify-between gap-3">
                    <BackToHomeLink
                        href="/notes"
                        label="Back to Notes"
                        className="border-border/70 bg-card/60 hover:bg-foreground hover:border-foreground"
                    />
                    <button
                        onClick={toggleLanguage}
                        className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 transition-colors hover:border-foreground hover:bg-foreground"
                    >
                        <Languages className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-background" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-foreground/80 transition-colors group-hover:text-background">
                            {lang === 'EN' ? 'Baca ID' : 'Read EN'}
                        </span>
                    </button>
                </div>

                <header className="mx-auto mt-16 flex min-h-[50vh] max-w-[980px] flex-col items-center justify-center text-center md:mt-20 md:min-h-[62vh]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                        {note.date} - Note {note.id.padStart(2, '0')}
                    </p>
                    <h1 className="mt-5 text-balance font-sans text-[clamp(2.9rem,9vw,8.2rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-foreground">
                        {currentContent.title}
                    </h1>
                </header>

                <article className="mx-auto max-w-[760px] border-t border-border/60 pt-10 md:pt-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={lang}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[clamp(1.12rem,1.55vw,1.7rem)] leading-[1.78] text-foreground/90 [text-align:justify]"
                        >
                            <div className="space-y-7">
                                {currentContent.paragraphs.map((paragraph, index) => (
                                    <div key={`${lang}-${index}`}>{paragraph}</div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </article>
            </section>
        </main>
    );
}
