'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { motion, Variants } from 'framer-motion';

export function LeftColumnContent() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
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
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <motion.h1 className="uppercase text-foreground max-w-[13ch]" variants={itemVariants}>
                <span className="block font-mono text-[10px] md:text-xs tracking-[0.38em] text-muted-foreground mb-2 md:mb-3">
                    PAGE ONE
                </span>
                <span className="block font-display text-[clamp(3.2rem,9.8vw,6.3rem)] leading-[0.82] tracking-[-0.01em]">
                    THE
                </span>
                <span className="block font-serif italic text-[clamp(2.1rem,7vw,4rem)] leading-[0.95] tracking-[0.08em] text-foreground/85 -mt-1 md:-mt-2">
                    MEMORY
                </span>
                <span className="block mt-3 h-px w-28 bg-foreground/25" />
            </motion.h1>

            <motion.p
                className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-[1.2] tracking-tight text-balance"
                variants={itemVariants}
            >
                Ini arsip jujur tentang apa yang kita lalui. Ada tawa dan lelah. Ada konflik dan rasa lega.
            </motion.p>

            <motion.div className="flex flex-wrap gap-1.5 mb-3 -mt-1" variants={itemVariants}>
                {['Kebahagiaan', 'Kesedihan', 'Konflik', 'Kelegaan'].map((tag) => (
                    <span
                        key={tag}
                        className="bg-secondary px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-secondary-foreground"
                    >
                        {tag}
                    </span>
                ))}
            </motion.div>

            <motion.div
                className="max-w-none text-muted-foreground font-serif text-base leading-relaxed border-t border-border pt-8"
                variants={itemVariants}
            >
                <p>
                    Aku menyimpan semuanya di sini agar cerita tetap utuh. Aku tidak menyalahkan siapa pun. Aku tidak meminta masa lalu kembali. Aku hanya tidak ingin perasaan kita hilang.
                </p>
                <p className="mt-6">
                    Jika kamu membaca ini. Aku harap kamu melihat sisi manusiawinya. Kita sudah berusaha. Kita gagal berkomunikasi pada saat itu. Kemudian kita belajar cara bertumbuh dewasa.
                </p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <MagneticButton>
                    <Button withArrow href="/story">
                        Read Our Story
                    </Button>
                </MagneticButton>
            </motion.div>
        </motion.div>
    );
}
