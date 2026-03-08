'use client';

import React, { useState } from 'react';
import { Languages, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import { Note } from '@/lib/notes';
import { cn } from '@/lib/utils';

export default function NoteDetailClient({ note }: { note: Note }) {
    const [lang, setLang] = useState<'EN' | 'ID'>('EN');
    const content = note.content[lang];

    const toggleLang = () => {
        setLang((prev) => (prev === 'EN' ? 'ID' : 'EN'));
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
                        onClick={toggleLang}
                        className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/70 bg-card/60 hover:bg-foreground hover:text-background transition-all active:scale-95 shadow-sm"
                    >
                        <Languages className="w-4 h-4 text-primary group-hover:text-background transition-colors" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                            {lang === 'EN' ? 'Translate to Indo' : 'Back to English'}
                        </span>
                        <ArrowLeftRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={lang}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <header className="mx-auto mt-16 flex min-h-[40vh] max-w-[980px] flex-col items-center justify-center text-center md:mt-20 md:min-h-[50vh]">
                            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground mb-4">
                                {note.date} - Note {note.id.padStart(2, '0')}
                            </p>
                            <h1 className={cn(
                                "text-balance font-sans font-semibold leading-[0.95] tracking-[-0.03em] text-foreground",
                                lang === 'EN' ? "text-[clamp(2.9rem,9vw,8.2rem)]" : "text-[clamp(2.5rem,8vw,7.2rem)] italic font-serif"
                            )}>
                                {content.title}
                            </h1>
                        </header>

                        <article className="mx-auto max-w-[760px] border-t border-border/60 pt-10 md:pt-12">
                            <div className={cn(
                                "text-[clamp(1.12rem,1.55vw,1.7rem)] leading-[1.78] [text-align:justify]",
                                lang === 'EN' ? "text-foreground/90" : "text-foreground/80 font-serif italic italic-shadow"
                            )}>
                                <div className="space-y-7">
                                    {content.paragraphs.map((paragraph: React.ReactNode, index: number) => (
                                        <div key={`${lang}-${index}`}>{paragraph}</div>
                                    ))}
                                </div>

                                {content.signature && (
                                    <div className="mt-16 text-right font-serif italic text-foreground/70">
                                        <p>{content.signature.closing},</p>
                                        <p className="mt-1 font-sans not-italic font-semibold text-foreground">{content.signature.name}</p>
                                    </div>
                                )}
                            </div>
                        </article>
                    </motion.div>
                </AnimatePresence>
            </section>
        </main>
    );
}
