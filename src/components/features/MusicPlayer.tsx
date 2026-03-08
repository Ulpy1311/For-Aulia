'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Repeat,
    Repeat1,
    Shuffle,
    ChevronDown,
} from 'lucide-react';
import { Howl } from 'howler';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/store';

interface Track {
    title: string;
    artist: string;
    src: string;
    cover: string;
}

const playlist: Track[] = [
    {
        title: 'Bercinta Lewat Kata',
        artist: 'Donne Maula',
        src: '/Music/Donne Maula - Bercinta Lewat Kata.mp3',
        cover: 'https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2F78933ac5e08410adafb8a433e73f44c1.1000x1000x1.png',
    },
    {
        title: 'Kita usahakan rumah itu',
        artist: 'Sal Priadi',
        src: '/Music/Sal Priadi - Kita usahakan rumah itu (Official Lyric Video).mp3',
        cover: 'https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2F7f890e22376dd77f45476ab89304fefe.1000x1000x1.png',
    },
    {
        title: 'Malam Tak Berjudul',
        artist: 'Monica Christiana',
        src: '/Music/Malam Tak Berjudul - Monica Christiana (Official Lyric Video).mp3',
        cover: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/1200x675/photo/2024/02/11/3930701702.jpeg',
    },
    {
        title: 'Losing Us.',
        artist: 'Raissa Anggiani',
        src: '/Music/Raissa Anggiani - Losing Us..mp3',
        cover: 'https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2Fdad0c0cba3f6b57a0841b83439a0e79f.1000x1000x1.png',
    },
    {
        title: 'Someone to Stay',
        artist: 'Vancouver Sleep Clinic',
        src: '/Music/Vancouver Sleep Clinic - Someone to Stay (Official Video).mp3',
        cover: 'https://images.genius.com/cada2c76ec4da5bf14606994bcfdc305.1000x1000x1.jpg',
    },
    {
        title: "Where's My Love",
        artist: 'SYML',
        src: "/Music/SYML - Where's My Love.mp3",
        cover: 'https://i1.sndcdn.com/artworks-000199178898-louuv3-t500x500.jpg',
    },
];

type LoopMode = 'off' | 'all' | 'one';

export function MusicPlayer() {
    const { isMusicPlayerOpen, setMusicPlayerOpen, hasEntryDismissed } = useUIStore();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.4); // slightly louder default
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loopMode, setLoopMode] = useState<LoopMode>('all'); // default to loop all
    const [isShuffle, setIsShuffle] = useState(false);

    const howlRef = useRef<Howl | null>(null);
    const rafRef = useRef<number | null>(null);
    const volumeRef = useRef(volume);
    const loopModeRef = useRef(loopMode);
    const isShuffleRef = useRef(isShuffle);
    const shouldAutoPlayRef = useRef(false);
    const hasTriggeredFirstPlayRef = useRef(false);

    const currentTrack = playlist[currentTrackIndex];

    const stopTicker = useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    const syncProgress = useCallback(function syncProgressInner() {
        const sound = howlRef.current;
        if (!sound) return;

        const seekValue = sound.seek();
        const current = typeof seekValue === 'number' ? seekValue : 0;
        const total = sound.duration() || 0;

        setCurrentTime(current);
        setDuration(total);
        setProgress(total > 0 ? (current / total) * 100 : 0);

        if (sound.playing()) {
            rafRef.current = requestAnimationFrame(syncProgressInner);
        }
    }, []);

    const startTicker = useCallback(() => {
        stopTicker();
        rafRef.current = requestAnimationFrame(syncProgress);
    }, [stopTicker, syncProgress]);

    useEffect(() => {
        if (hasEntryDismissed && !hasTriggeredFirstPlayRef.current) {
            hasTriggeredFirstPlayRef.current = true;
            shouldAutoPlayRef.current = true;
            howlRef.current?.play();
        }
    }, [hasEntryDismissed]);

    useEffect(() => {
        volumeRef.current = volume;
        howlRef.current?.volume(volume);
    }, [volume]);

    useEffect(() => {
        loopModeRef.current = loopMode;
        howlRef.current?.loop(loopMode === 'one');
    }, [loopMode]);

    useEffect(() => {
        isShuffleRef.current = isShuffle;
    }, [isShuffle]);

    useEffect(() => {
        const shouldAutoPlay = shouldAutoPlayRef.current;
        shouldAutoPlayRef.current = false;

        stopTicker();
        howlRef.current?.unload();

        const sound = new Howl({
            src: [playlist[currentTrackIndex].src],
            html5: true,
            preload: true,
            volume: volumeRef.current,
            loop: loopModeRef.current === 'one',
            onload: () => {
                setDuration(sound.duration());
            },
            onplay: () => {
                setIsPlaying(true);
                startTicker();
            },
            onpause: () => setIsPlaying(false),
            onstop: () => setIsPlaying(false),
            onend: () => {
                stopTicker();
                if (loopModeRef.current === 'one') return;

                if (isShuffleRef.current) {
                    let nextIndex;
                    do {
                        nextIndex = Math.floor(Math.random() * playlist.length);
                    } while (nextIndex === currentTrackIndex && playlist.length > 1);
                    shouldAutoPlayRef.current = true;
                    setCurrentTrackIndex(nextIndex);
                    return;
                }

                const hasNextTrack = currentTrackIndex < playlist.length - 1;
                if (hasNextTrack) {
                    shouldAutoPlayRef.current = true;
                    setCurrentTrackIndex((prev) => prev + 1);
                } else if (loopModeRef.current === 'all') {
                    shouldAutoPlayRef.current = true;
                    setCurrentTrackIndex(0);
                } else {
                    setIsPlaying(false);
                }
            },
        });

        howlRef.current = sound;
        if (shouldAutoPlay) sound.play();

        return () => {
            sound.unload();
        };
    }, [currentTrackIndex, startTicker, stopTicker]);

    const togglePlay = () => {
        const sound = howlRef.current;
        if (!sound) return;
        if (sound.playing()) {
            sound.pause();
        } else {
            shouldAutoPlayRef.current = true;
            sound.play();
        }
    };

    const handleNext = () => {
        shouldAutoPlayRef.current = true;
        if (isShuffle) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentTrackIndex && playlist.length > 1);
            setCurrentTrackIndex(nextIndex);
        } else {
            setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        }
    };

    const handlePrev = () => {
        shouldAutoPlayRef.current = true;
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const toggleLoop = () => {
        const modes: LoopMode[] = ['off', 'all', 'one'];
        const nextIndex = (modes.indexOf(loopMode) + 1) % modes.length;
        setLoopMode(modes[nextIndex]);
    };

    const formatTime = (seconds: number) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const sound = howlRef.current;
        if (!sound || duration <= 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, x / rect.width));
        sound.seek(ratio * duration);
        syncProgress();
    };

    return (
        <>
            <AnimatePresence>
                {isMusicPlayerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMusicPlayerOpen(false)}
                        className="fixed inset-0 z-40 bg-background/20 backdrop-blur-[2px]"
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-0 right-0 z-50 p-6 flex flex-col items-end pointer-events-none">
                <AnimatePresence mode="wait">
                    {isMusicPlayerOpen ? (
                        <motion.div
                            key="expanded"
                            initial={{ y: 50, opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ y: 50, opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="pointer-events-auto bg-secondary/80 dark:bg-card/40 backdrop-blur-3xl border border-border rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] p-6 w-[320px] relative overflow-hidden group/player transition-all duration-500"
                        >
                            {/* Decorative background glows - neutral */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-foreground/5 dark:bg-white/5 rounded-full blur-[80px] group-hover/player:bg-foreground/10 dark:group-hover/player:bg-white/10 transition-colors duration-700" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-foreground/5 dark:bg-white/5 rounded-full blur-[80px] group-hover/player:bg-foreground/10 dark:group-hover/player:bg-white/10 transition-colors duration-700" />

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[9px] font-sans font-medium uppercase tracking-[0.4em] text-muted-foreground/60">
                                    Now Playing
                                </span>
                                <button
                                    onClick={() => setMusicPlayerOpen(false)}
                                    className="p-2 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] rounded-full transition-colors group/close"
                                >
                                    <ChevronDown className="w-5 h-5 text-muted-foreground/40 group-hover/close:text-foreground transition-colors" />
                                </button>
                            </div>

                            <div className="relative group mb-8">
                                <motion.div
                                    animate={{ rotate: isPlaying ? 360 : 0 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                                    className="w-40 h-40 mx-auto rounded-full ring-8 ring-white/5 shadow-2xl overflow-hidden relative"
                                >
                                    <Image
                                        src={currentTrack.cover}
                                        alt={currentTrack.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                </motion.div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-card rounded-full ring-4 ring-white/20 z-10 shadow-inner" />
                            </div>

                            <div className="text-center mb-8">
                                <h3 className="text-lg font-bold tracking-tight text-foreground mb-1 mt-2 line-clamp-1 uppercase font-display">
                                    {currentTrack.title}
                                </h3>
                                <p className="text-[10px] font-sans font-semibold tracking-[0.2em] text-muted-foreground uppercase opacity-80">
                                    {currentTrack.artist}
                                </p>
                            </div>

                            {/* Progress Section */}
                            <div className="px-2 mb-8">
                                <div
                                    className="relative h-1.5 w-full bg-muted dark:bg-white/10 rounded-full overflow-hidden cursor-pointer group/progress"
                                    onClick={handleSeek}
                                >
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-foreground dark:bg-white"
                                        style={{ width: `${progress}%` }}
                                        layoutId="progress-bar"
                                    />
                                    <div className="absolute inset-0 bg-foreground/5 dark:bg-white/5 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex justify-between text-[9px] font-sans font-medium text-muted-foreground/40 mt-2.5 tabular-nums tracking-wider uppercase">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between px-2">
                                    <button
                                        onClick={() => setIsShuffle(!isShuffle)}
                                        className={cn(
                                            'p-2.5 rounded-full transition-all hover:bg-black/[0.03] dark:hover:bg-white/[0.03]',
                                            isShuffle ? 'text-foreground dark:text-white scale-110 font-bold' : 'text-muted-foreground/30'
                                        )}
                                    >
                                        <Shuffle className={cn("w-4 h-4", isShuffle && "stroke-[3px]")} />
                                    </button>

                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={handlePrev}
                                            className="text-muted-foreground/40 hover:text-foreground transition-all hover:scale-110 active:scale-90"
                                        >
                                            <SkipBack className="w-6 h-6 fill-current" />
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            className="w-16 h-16 bg-foreground dark:bg-white text-background dark:text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] dark:shadow-[0_12px_32px_-8px_rgba(255,255,255,0.2)] group/play"
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-7 h-7 fill-current" />
                                            ) : (
                                                <Play className="w-7 h-7 fill-current ml-1" />
                                            )}
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="text-muted-foreground/40 hover:text-foreground transition-all hover:scale-110 active:scale-90"
                                        >
                                            <SkipForward className="w-6 h-6 fill-current" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={toggleLoop}
                                        className={cn(
                                            'p-2.5 rounded-full transition-all hover:bg-black/[0.03] dark:hover:bg-white/[0.03]',
                                            loopMode !== 'off' ? 'text-foreground dark:text-white scale-110 font-bold' : 'text-muted-foreground/30'
                                        )}
                                    >
                                        {loopMode === 'one' ? (
                                            <Repeat1 className="w-4 h-4 stroke-[3px]" />
                                        ) : (
                                            <Repeat className={cn("w-4 h-4", loopMode === 'all' && "stroke-[3px]")} />
                                        )}
                                    </button>
                                </div>

                                {/* Volume Section */}
                                <div className="flex items-center gap-4 px-4 py-3 bg-black/[0.04] dark:bg-white/[0.04] rounded-2xl border border-black/[0.04] dark:border-white/[0.04] group/volume transition-all hover:bg-black/[0.06] dark:hover:bg-white/[0.06]">
                                    <button
                                        onClick={() => setVolume((v) => (v === 0 ? 0.4 : 0))}
                                        className="text-foreground/30 dark:text-white/30 hover:text-foreground dark:hover:text-white transition-colors"
                                    >
                                        {volume === 0 ? (
                                            <VolumeX className="w-4 h-4" />
                                        ) : (
                                            <Volume2 className="w-4 h-4" />
                                        )}
                                    </button>
                                    <div className="relative flex-1 group/slider">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={volume}
                                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                                            className="w-full h-1 bg-muted dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-foreground dark:accent-white transition-all slider-thumb-premium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.button
                            key="collapsed"
                            layoutId="music-player-trigger"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            onClick={() => setMusicPlayerOpen(true)}
                            className="pointer-events-auto group flex items-center gap-4 bg-secondary/90 dark:bg-card/70 backdrop-blur-3xl border border-border pr-6 pl-2 py-2 rounded-full shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.4)] transition-all active:scale-95"
                        >
                            <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg border border-border ring-2 ring-black/[0.02] dark:ring-white/[0.05]">
                                <Image
                                    src={currentTrack.cover}
                                    alt="Cover"
                                    fill
                                    className={cn(
                                        "object-cover transition-transform duration-[6s] linear infinite",
                                        isPlaying && "rotate-360"
                                    )}
                                    style={{ animationIterationCount: 'infinite' }}
                                />
                                {isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 dark:bg-black/40">
                                        <div className="flex gap-0.5 items-end h-3">
                                            <motion.div
                                                animate={{ height: [4, 12, 6, 12, 4] }}
                                                transition={{ duration: 0.6, repeat: Infinity }}
                                                className="w-0.5 bg-white rounded-full shadow-sm"
                                            />
                                            <motion.div
                                                animate={{ height: [8, 4, 12, 4, 8] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                className="w-0.5 bg-white rounded-full shadow-sm"
                                            />
                                            <motion.div
                                                animate={{ height: [12, 6, 4, 10, 12] }}
                                                transition={{ duration: 0.7, repeat: Infinity }}
                                                className="w-0.5 bg-white rounded-full shadow-sm"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col items-start min-w-[100px] max-w-[150px]">
                                <span className="text-[8px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/40 mb-0.5">
                                    Now Playing
                                </span>
                                <h4 className="text-[10px] font-bold uppercase truncate w-full tracking-tight text-foreground/80 font-display">
                                    {currentTrack.title}
                                </h4>
                            </div>

                            <div className="ml-2 w-8 h-8 rounded-full bg-muted/30 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-foreground group-hover:text-background dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                                {isPlaying ? (
                                    <Pause className="w-3.5 h-3.5 fill-current" />
                                ) : (
                                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                )}
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                @keyframes rotate-360 {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .rotate-360 {
                    animation: rotate-360 8s linear infinite;
                }
                
                /* Premium Slider Styles */
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(0,0,0,0.5);
                    transition: all 0.2s ease;
                }
                input[type='range']:hover::-webkit-slider-thumb {
                    transform: scale(1.2);
                    background: #fff;
                    box-shadow: 0 0 15px rgba(255,255,255,0.5);
                }
                
                .slider-thumb-premium::-webkit-slider-thumb {
                    border: 2px solid rgba(255,255,255,0.2);
                }
            `}</style>
        </>
    );
}
