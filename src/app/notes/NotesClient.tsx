'use client';

import { SplitLayout } from '@/components/layout/SplitLayout';
import { LeftColumnContent } from '@/components/features/LeftColumnContent';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function NotesClient({ initialData = [] }: { initialData?: {id: string, title: string, content: string | {EN: string, ID: string}, date: string, isArchived: boolean, isHidden: boolean}[] }) {
    const [notes] = useState(initialData);
    const router = useRouter();

    const leftContent = (
        <div className="flex flex-col gap-6 w-full max-w-md py-12 md:py-0 sticky top-24 h-fit">
            <BackToHomeLink className="mb-4" />
            <h1 className="uppercase text-foreground max-w-[13ch]">
                <span className="block font-mono text-[10px] md:text-xs tracking-[0.38em] text-muted-foreground mb-2 md:mb-3">PAGE FOUR</span>
                <span className="block font-display text-[clamp(3.2rem,9.8vw,6.3rem)] leading-[0.82] tracking-[-0.01em]">NOTE</span>
                <span className="block font-serif italic text-[clamp(2.1rem,7vw,4rem)] leading-[0.95] tracking-[0.08em] text-foreground/85 -mt-1 md:-mt-2">BOOKS</span>
                <span className="block mt-3 h-px w-28 bg-foreground/25" />
            </h1>
            <LeftColumnContent />
        </div>
    );

    const rightContent = (
        <div className="flex flex-col gap-6 md:gap-10 pb-20">
            {notes.map((note) => (
                <article
                    key={note.id}
                    onClick={() => {
                        if (note.isHidden) return; // tidak bisa di klik jika hidden
                        router.push(`/notes/${note.id}`);
                    }}
                    className={`group cursor-pointer rounded-2xl bg-card border ${note.isHidden ? 'border-amber-500/30 blur-sm pointer-events-none select-none contrast-75 brightness-75' : note.isArchived ? 'border-dashed opacity-70' : 'border-border/50 hover:border-foreground/20'} p-6 md:p-8 lg:p-10 transition-all duration-500 hover:shadow-sm`}
                >
                    <div className="flex flex-col gap-4">
                        <header>
                            <time className="text-xs md:text-sm font-mono tracking-widest text-muted-foreground uppercase">{note.date}</time>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mt-2 leading-tight tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                {note.title}
                            </h2>
                            {note.isArchived && <span className="text-[10px] bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider inline-block mt-2">Archived Note</span>}
                        </header>
                        <div className="prose prose-sm md:prose-base dark:prose-invert prose-p:font-serif prose-p:leading-[1.85] text-muted-foreground/90 max-w-none">
                            <p className="line-clamp-3">{typeof note.content === "string" ? note.content : JSON.stringify(note.content)}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground/40 group-hover:text-foreground/80 transition-colors">
                            <span>Read Full Note</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );

    return (
        <main className="page-shell">
            <SplitLayout leftContent={leftContent} rightContent={rightContent} />
        </main>
    );
}
