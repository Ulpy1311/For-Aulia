'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const mockupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Parallax for background
            gsap.to(imageRef.current, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Floating effect for mockup
            gsap.to(mockupRef.current, {
                y: -30,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden group bg-secondary rounded-lg h-[500px] w-full"
        >
            <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                    ref={imageRef}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAePa2DraEx80aHxdhFMueWindK9hv3ZpgGgXUr2PXF0fYnlnazHfiM3JJQZJZAgRgTQypl1r98x33TEJkub432x5NFewQr2tEoTgVQBLU09bEC26DiZD1ZNFWvBrm_3g7KyZ_Dfpu-6zzN2y9h7D6POg0Wt04imbSjLJD9qrqwK55ZhJAOH3TGGzKy1u-HfjFqtOX5XHXdLT-TjDpM3aS4ZNJq8JEnwqx3qHLE4E3wVybv0rx5_fp7IA0QwrfxjDrgvbDU1Tt2xw"
                    alt="Fresh kale texture"
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    priority
                />
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                <div
                    ref={mockupRef}
                    className="bg-white dark:bg-gray-900 w-full max-w-lg shadow-2xl rounded-lg overflow-hidden border border-border transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
                >
                    <div className="bg-accent p-2 flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="p-0 relative aspect-video">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDichjfcmFVk1So7pnIBNykFgspygumKWtcwvTgkAZeX6djndWqLs8Xnu0fwNcpk4bnO4bpTQ2FbDx8bdkjJfMtXJv9U7AXp6BVnKTUADnkPeUkqXkl0jftM5cZ7JdTZNUEU3onle6tJswDrtopPk_ZkFi4ecAonFBh2yYM0DStktI6OGe-GUhr59bqsdK4Vu2kYhUwiLgBKtfA0iqZ5LeT0louYQ9-dnfX0pYEwcf5topVJrFDHvFgtbuyewr7Tz8Mp4Jvvux2AQ"
                            alt="Salad bowl UI mockup"
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
