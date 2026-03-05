'use client';

import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import type { MemoryItem } from '@/lib/story-data';

interface StoryGridProps {
    memoriesPromise: Promise<MemoryItem[]>;
}

export function StoryGrid({ memoriesPromise }: StoryGridProps) {
    const memories = use(memoriesPromise);
    const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedMemory(null);
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {memories.map((memory) => (
                        <motion.article
                            key={memory.id}
                            layout
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="group flex flex-col bg-card border-2 border-border/80 overflow-hidden hover:shadow-lg transition-all duration-500 rounded-lg cursor-pointer hover:-translate-y-0.5"
                            onClick={() => setSelectedMemory(memory)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    setSelectedMemory(memory);
                                }
                            }}
                        >
                            <div className="relative aspect-[3/2] w-full overflow-hidden border-b-2 border-border/80">
                                <Image
                                    src={memory.image}
                                    alt={memory.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="font-display text-lg uppercase leading-tight group-hover:text-primary transition-colors line-clamp-1">
                                        {memory.title}
                                    </h2>
                                    <span className="font-mono text-xs text-muted-foreground/50 font-bold shrink-0 ml-2">
                                        {memory.id}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-2.5 h-2.5" /> {memory.date}
                                    </span>
                                </div>

                                <p className="font-serif text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                    &ldquo;{memory.description}&rdquo;
                                </p>

                                <span className="mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                                    Tap to read full note
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {selectedMemory && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMemory(null)}
                            className="fixed inset-0 z-[90] bg-background/70 backdrop-blur-md"
                        />

                        <div className="fixed inset-0 z-[91] p-4 md:p-6 grid place-items-center pointer-events-none">
                            <motion.article
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                className="pointer-events-auto w-[min(92vw,860px)] max-h-[80vh] bg-card/95 backdrop-blur-xl border-2 border-border/80 rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <div className="relative aspect-[16/9] border-b-2 border-border/80">
                                    <Image
                                        src={selectedMemory.image}
                                        alt={selectedMemory.title}
                                        fill
                                        sizes="(max-width: 1024px) 92vw, 860px"
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => setSelectedMemory(null)}
                                        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur border-2 border-border/80 inline-flex items-center justify-center text-foreground hover:bg-background transition-colors"
                                        aria-label="Close memory detail"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="p-5 md:p-6 overflow-y-auto max-h-[calc(80vh-15rem)]">
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                        <h3 className="font-display text-2xl md:text-3xl uppercase leading-tight text-card-foreground">
                                            {selectedMemory.title}
                                        </h3>
                                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                                            #{selectedMemory.id}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-5">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {selectedMemory.date}
                                        </span>
                                    </div>

                                    <p className="font-serif text-[16px] md:text-[17px] leading-8 text-card-foreground/85">
                                        {selectedMemory.description}
                                    </p>
                                </div>
                            </motion.article>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
