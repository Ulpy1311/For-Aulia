'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { assetPreloader } from '@/lib/utils/asset-preloader';
import { memorySeed } from '@/lib/story-data';

interface LoadingScreenProps {
    onComplete: () => void;
}

const words = ["Memories", "Reflection", "Healing", "Growth"];

const technicalMessages = [
    "INITIALIZING_WEBGL_CORE",
    "FETCHING_ENVIRONMENT_MAPS",
    "DECODING_IMAGE_TEXTURES",
    "READYING_SHADERS",
    "OPTIMIZING_RENDER_PIPELINE",
    "SYNCING_UI_STATES",
    "FINALIZING_SYSTEM_BOOT",
];

// Helper to collect all assets across the project
const getAllAssets = () => {
    const localAssets = [
        "/cursors/mac-default.svg",
        "/cursors/mac-pointer.svg",
        "/cursors/mac-text.svg",
        "/icon.png",
        // Frames
        ...Array.from({ length: 80 }, (_, i) => `/Photo Landing/1000258716_frame_${i + 1}.jpg`),
        // Music files
        "/Music/Donne Maula - Bercinta Lewat Kata.mp3",
        "/Music/Sal Priadi - Kita usahakan rumah itu (Official Lyric Video).mp3",
        "/Music/Malam Tak Berjudul - Monica Christiana (Official Lyric Video).mp3",
        "/Music/Raissa Anggiani - Losing Us..mp3",
        "/Music/Vancouver Sleep Clinic - Someone to Stay (Official Video).mp3",
        "/Music/SYML - Where's My Love.mp3",
    ];

    const externalAssets = [
        // Music Covers
        'https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2F78933ac5e08410adafb8a433e73f44c1.1000x1000x1.png',
        'https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2F7f890e22376dd77f45476ab89304fefe.1000x1000x1.png',
        'https://assets.pikiran-rakyat.com/crop/0x0:0x0/1200x675/photo/2024/02/11/3930701702.jpeg',
        'https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2Fdad0c0cba3f6b57a0841b83439a0e79f.1000x1000x1.png',
        'https://images.genius.com/cada2c76ec4da5bf14606994bcfdc305.1000x1000x1.jpg',
        'https://i1.sndcdn.com/artworks-000199178898-louuv3-t500x500.jpg',
        // Story Images
        ...memorySeed.map(m => m.image),
        // Slideshow Images (Cosmos)
        'https://cdn.cosmos.so/8b0252bd-cb64-45f4-aef8-672c7f628f76?format=jpeg',
        'https://cdn.cosmos.so/7b3f4c48-ec63-4bac-b472-910c037a0eb4?format=jpeg',
        'https://cdn.cosmos.so/444502b9-4cb9-4f14-a068-f0213df08729?format=jpeg',
        'https://cdn.cosmos.so/ef511e17-a35b-42e6-9122-2754bbd2ad7e?format=jpeg',
        'https://cdn.cosmos.so/cf68a397-080a-437a-994e-69dedd9e6e06?format=jpeg',
    ];

    return [...new Set([...localAssets, ...externalAssets])];
};

const IMAGE_ASSETS = getAllAssets();


export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [wordIndex, setWordIndex] = useState(0);
    const [currentAsset, setCurrentAsset] = useState("");
    const [assetHistory, setAssetHistory] = useState<string[]>([]);
    const [statusMsg, setStatusMsg] = useState(technicalMessages[0]);
    const [isPreloadComplete, setIsPreloadComplete] = useState(false);

    // Smooth progress interpolation
    const rawProgress = useMotionValue(0);
    const smoothProgress = useSpring(rawProgress, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    const displayProgress = useTransform(smoothProgress, (latest) => Math.floor(latest));
    const [counterValue, setCounterValue] = useState(0);

    useEffect(() => {
        const unsubscribe = displayProgress.on("change", (latest) => {
            setCounterValue(latest);
        });
        return () => unsubscribe();
    }, [displayProgress]);

    // Update ref to avoid stale closures
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Word cycling logic
    useEffect(() => {
        const wordInterval = setInterval(() => {
            setWordIndex((prev) => {
                if (prev < words.length - 1) return prev + 1;
                return prev;
            });
        }, 1200);

        return () => clearInterval(wordInterval);
    }, []);

    // Technical status messages
    useEffect(() => {
        const statusInterval = setInterval(() => {
            setStatusMsg((prev) => {
                const currentIndex = technicalMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % technicalMessages.length;
                return technicalMessages[nextIndex];
            });
        }, 1800);
        return () => clearInterval(statusInterval);
    }, []);

    // Asset Preloading Logic with Minimum Duration
    useEffect(() => {
        const startTime = Date.now();
        const minDuration = 5500; // 5.5s for show-off

        assetPreloader.setAssets(IMAGE_ASSETS);

        const startPreloading = async () => {
            // Fix: pass the callback to the preload method as per AssetPreloader implementation
            await assetPreloader.preload(({ percentage, currentAsset }) => {
                rawProgress.set(percentage);
                if (currentAsset) {
                    const assetName = currentAsset.split('/').pop() || "";
                    setCurrentAsset(assetName);
                    setAssetHistory((prev) => {
                        if (prev[0] === assetName) return prev;
                        return [assetName, ...prev].slice(0, 5);
                    });
                }
            });

            // Ensure min duration
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minDuration - elapsed);

            setTimeout(() => {
                setIsPreloadComplete(true);
            }, remaining);
        };

        void startPreloading();
    }, [rawProgress]);

    // Complete loader with extra hold
    useEffect(() => {
        if (isPreloadComplete) {
            const timeout = setTimeout(() => {
                onCompleteRef.current();
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [isPreloadComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] bg-[#faf8f5] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Grid - Engineering style */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#1c1a17 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Corner Markers */}
            <div className="absolute top-10 right-10 text-[10px] font-mono text-[#1c1a17]/40 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                System_Online
            </div>

            {/* Element 1: Rotating Words (Center Top) */}
            <div className="relative h-20 flex items-center justify-center mb-8">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={wordIndex}
                        initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="text-3xl md:text-4xl font-instrument italic text-[#1c1a17] tracking-[0.2em] uppercase"
                    >
                        {words[wordIndex]}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Element 2: Large Counter (Center) */}
            <div className="relative flex flex-col items-center">
                <motion.span
                    className="text-[12rem] md:text-[18rem] lg:text-[22rem] font-instrument text-[#1c1a17] tabular-nums leading-none tracking-tighter"
                    style={{ fontFeatureSettings: '"tnum" on, "lnum" on' }}
                >
                    {counterValue.toString().padStart(3, '0')}
                </motion.span>

                {/* Status Bar */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 w-[200%] justify-center opacity-40">
                    <span className="text-[11px] font-mono tracking-widest text-[#1c1a17] uppercase">
                        [{statusMsg}]
                    </span>
                    <div className="w-48 h-[1px] bg-[#1c1a17]/20 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-[#1c1a17]"
                            style={{ width: `${counterValue}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Element 3: Asset Terminal (Bottom) */}
            <div className="absolute bottom-12 left-10 right-10 flex flex-col items-start gap-1">
                <div className="text-[8px] font-mono text-[#1c1a17]/40 uppercase tracking-[0.4em] mb-3">
                    Console.Asset_Log.v1.0
                </div>
                <div className="flex flex-col gap-0.5 w-full h-24 overflow-hidden">
                    <AnimatePresence initial={false}>
                        {assetHistory.map((asset, i) => (
                            <motion.div
                                key={asset + i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: Math.max(0.1, 1 - i * 0.2), x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2"
                            >
                                <span className={cn(
                                    "text-[9px] font-mono uppercase",
                                    i === 0 ? "text-green-600/80" : "text-[#1c1a17]/30"
                                )}>
                                    {i === 0 ? "[ACTIVE_LOAD]" : "[LOAD_COMPLETE]"}
                                </span>
                                <span className="text-[10px] font-mono text-[#1c1a17]/60 truncate uppercase tracking-tight">
                                    {asset}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {assetHistory.length === 0 && (
                        <div className="text-[10px] font-mono text-[#1c1a17]/20 uppercase">
                            $ waiting_for_assets...
                        </div>
                    )}
                </div>
            </div>

            {/* Scanner Line */}
            <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-[#1c1a17]/10 z-10 pointer-events-none"
                style={{ top: `${counterValue}%` }}
            />

            {/* Element 3: Progress Bar (Bottom Edge) - Fixed */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1c1a17]/5">
                <motion.div
                    className="h-full bg-[#1c1a17]"
                    style={{ width: `${counterValue}%` }}
                />
            </div>
        </motion.div>
    );
}
