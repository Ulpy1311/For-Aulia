'use client';

import React, { useMemo, useState } from 'react';

export interface SlideshowItem {
    id: string;
    img: string;
    text: [string, string];
}

const defaultSlides: SlideshowItem[] = [
    {
        id: '01',
        img: 'https://cdn.cosmos.so/8b0252bd-cb64-45f4-aef8-672c7f628f76?format=jpeg',
        text: ['BETWEEN SHADOW', 'AND LIGHT'],
    },
    {
        id: '02',
        img: 'https://cdn.cosmos.so/7b3f4c48-ec63-4bac-b472-910c037a0eb4?format=jpeg',
        text: ['SILENCE SPEAKS', 'THROUGH FORM'],
    },
    {
        id: '03',
        img: 'https://cdn.cosmos.so/444502b9-4cb9-4f14-a068-f0213df08729?format=jpeg',
        text: ['ESSENCE BEYOND', 'PERCEPTION'],
    },
    {
        id: '04',
        img: 'https://cdn.cosmos.so/ef511e17-a35b-42e6-9122-2754bbd2ad7e?format=jpeg',
        text: ['TRUTH IN', 'EMPTINESS'],
    },
    {
        id: '05',
        img: 'https://cdn.cosmos.so/cf68a397-080a-437a-994e-69dedd9e6e06?format=jpeg',
        text: ['SURRENDER TO', 'THE VOID'],
    },
];

interface SlideshowProps {
    slides?: SlideshowItem[];
}

export default function Component({ slides = defaultSlides }: SlideshowProps) {
    const safeSlides = slides.length > 0 ? slides : defaultSlides;
    const [current, setCurrent] = useState(0);

    const currentItem = safeSlides[current];
    const total = safeSlides.length;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

    const counter = useMemo(() => {
        const currentLabel = String(current + 1).padStart(2, '0');
        const totalLabel = String(total).padStart(2, '0');
        return `${currentLabel} / ${totalLabel}`;
    }, [current, total]);

    return (
        <div className="relative w-full">
            <div className="relative h-[68vh] min-h-[420px] max-h-[760px] w-full overflow-hidden rounded-2xl border-2 border-border/70 bg-card shadow-lg">
                {safeSlides.map((slide, i) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
                            }`}
                        style={{ backgroundImage: `url(${slide.img})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                        <div className="absolute left-5 bottom-6 md:left-8 md:bottom-8">
                            <p className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.92] uppercase text-white drop-shadow-md">
                                {slide.text.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 md:h-11 md:w-11 rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm hover:bg-black/45 transition-colors"
                    aria-label="Previous slide"
                >
                    &larr;
                </button>
                <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 md:h-11 md:w-11 rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm hover:bg-black/45 transition-colors"
                    aria-label="Next slide"
                >
                    &rarr;
                </button>

                <div className="absolute right-4 bottom-4 rounded-full border border-white/35 bg-black/35 px-3 py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-[0.16em] text-white">
                    {counter}
                </div>
            </div>

            <div className="mt-3 border border-border/70 rounded-xl bg-card/50 px-4 py-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    Active Photo
                </p>
                <p className="mt-1 font-serif text-sm text-foreground/80">
                    #{currentItem.id} - {currentItem.text.join(' ')}
                </p>
            </div>
        </div>
    );
}
