'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function FadeIn({
    children,
    delay = 0,
    y = 50,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}) {
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (el.current) {
            gsap.fromTo(el.current, {
                y: y,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    }, [delay, y]);

    return (
        <div ref={el} className={className}>
            {children}
        </div>
    );
}
