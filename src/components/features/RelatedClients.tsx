'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface EmotionLabel {
    id: string;
    label: string;
    price: string;
    note: string;
    accent: string;
}

const labels: EmotionLabel[] = [
    {
        id: 'joy',
        label: 'HAPPINESS',
        price: 'Time',
        note: 'Laughing until we lost track of time. Going home with a light heart.',
        accent: 'text-emerald-600',
    },
    {
        id: 'grief',
        label: 'SADNESS',
        price: 'Sleep',
        note: 'Long nights and noisy thoughts. Trying to stay calm.',
        accent: 'text-sky-600',
    },
    {
        id: 'anger',
        label: 'ANGER',
        price: 'Ego',
        note: 'Loud voices and the wrong words. Regretting after everything settles.',
        accent: 'text-rose-600',
    },
    {
        id: 'relief',
        label: 'RELIEF',
        price: 'Acceptance',
        note: 'No longer together. You still choose to appreciate.',
        accent: 'text-violet-600',
    },
];

export function RelatedClients() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div
            className="desktop-shell mt-32 pt-16 border-t border-border mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.h2 className="uppercase text-foreground mb-12" variants={itemVariants}>
                <span className="block font-mono text-[10px] md:text-xs tracking-[0.38em] text-muted-foreground mb-2 md:mb-3">
                    PHASES
                </span>
                <span className="block font-display text-[clamp(3.2rem,9.8vw,6.3rem)] leading-[0.82] tracking-[-0.01em]">
                    EMOTIONAL
                </span>
                <span className="block font-serif italic text-[clamp(2.1rem,7vw,4rem)] leading-[0.95] tracking-[0.08em] text-foreground/85 -mt-1 md:-mt-2">
                    LABELS
                </span>
                <span className="block mt-4 h-px w-28 bg-foreground/25" />
            </motion.h2>

            <motion.p
                className="max-w-3xl font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-[1.2] tracking-tight text-balance mb-10"
                variants={itemVariants}
            >
                Every phase requires emotional sacrifice and energy. These moments shape how we grow.
            </motion.p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
                variants={containerVariants}
            >
                {labels.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="group relative border border-border bg-card p-6 min-h-52 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <span className="font-display text-3xl uppercase tracking-tight text-foreground">
                                {item.label}
                            </span>
                            <span className={`text-[11px] font-mono uppercase tracking-wider ${item.accent}`}>
                                {item.price}
                            </span>
                        </div>

                        <p className="font-serif text-sm text-muted-foreground leading-relaxed mt-6">
                            {item.note}
                        </p>

                        <div className="mt-6 border-t border-dashed border-border pt-3">
                            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                                Emotional Proof
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
