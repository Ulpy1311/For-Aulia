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
    const { isMusicPlayerOpen, setMusicPlayerOpen, hasEntryDismissed } =
        useUIStore();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.25);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loopMode, setLoopMode] = useState<LoopMode>('off');

    const howlRef = useRef<Howl | null>(null);
    const rafRef = useRef<number | null>(null);
    const volumeRef = useRef(volume);
    const loopModeRef = useRef(loopMode);
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
        if (!sound) {
            return;
        }

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

    // Play music only after entry modal is dismissed
    useEffect(() => {
        if (hasEntryDismissed && !hasTriggeredFirstPlayRef.current) {
            hasTriggeredFirstPlayRef.current = true;
            shouldAutoPlayRef.current = true;
            const sound = howlRef.current;
            if (sound && !sound.playing()) {
                sound.play();
            }
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
                setCurrentTime(0);
                setProgress(0);
                setDuration(sound.duration());
            },
            onplay: () => {
                setIsPlaying(true);
                startTicker();
            },
            onpause: () => {
                setIsPlaying(false);
                stopTicker();
            },
            onstop: () => {
                setIsPlaying(false);
                stopTicker();
            },
            onend: () => {
                stopTicker();
                if (loopModeRef.current === 'one') {
                    return;
                }

                const hasNextTrack = currentTrackIndex < playlist.length - 1;
                if (hasNextTrack) {
                    shouldAutoPlayRef.current = true;
                    setCurrentTrackIndex((prev) => prev + 1);
                    return;
                }

                if (loopModeRef.current === 'all') {
                    shouldAutoPlayRef.current = true;
                    setCurrentTrackIndex(0);
                    return;
                }
                setIsPlaying(false);
            },
            onplayerror: () => {
                setIsPlaying(false);
                stopTicker();
            },
        });

        howlRef.current = sound;

        if (shouldAutoPlay) {
            sound.play();
        }

        return () => {
            sound.unload();
        };
    }, [currentTrackIndex, startTicker, stopTicker]);



    useEffect(
        () => () => {
            stopTicker();
            howlRef.current?.unload();
        },
        [stopTicker]
    );

    const togglePlay = () => {
        const sound = howlRef.current;
        if (!sound) {
            return;
        }

        if (sound.playing()) {
            sound.pause();
            return;
        }

        shouldAutoPlayRef.current = true;
        sound.play();
    };

    const handleNext = () => {
        shouldAutoPlayRef.current = true;
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
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

    return (
        <>
            <AnimatePresence>
                {isMusicPlayerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMusicPlayerOpen(false)}
                        className="fixed inset-0 z-40 bg-transparent"
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-0 right-0 z-50 flex flex-col items-end p-6 pointer-events-none"
            >
                <div className="pointer-events-auto">
                    <AnimatePresence mode="wait">
                        {isMusicPlayerOpen ? (
                            <motion.div
                                key="expanded"
                                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 20, opacity: 0, scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="bg-card/95 backdrop-blur-xl border border-border rounded-[2rem] shadow-2xl p-5 w-[280px] overflow-hidden relative transition-colors duration-300"
                            >
                                <div className="flex justify-between items-center mb-4 relative z-10">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                        Player
                                    </span>
                                    <button
                                        onClick={() => setMusicPlayerOpen(false)}
                                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-muted rounded-full"
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex justify-center mb-5 relative z-10">
                                    <motion.div
                                        animate={{ rotate: isPlaying ? 360 : 0 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                        className={cn(
                                            'w-32 h-32 rounded-full border-[4px] border-foreground/20 shadow-2xl overflow-hidden relative',
                                            !isPlaying && 'play-paused'
                                        )}
                                        style={{
                                            animationPlayState: isPlaying ? 'running' : 'paused',
                                        }}
                                    >
                                        <Image
                                            src={currentTrack.cover}
                                            alt={currentTrack.title}
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                        />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full border border-border z-10 flex items-center justify-center">
                                            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="text-center mb-4 relative z-10 px-2">
                                    <h3 className="font-display text-lg font-bold uppercase truncate text-card-foreground mb-0.5 tracking-tight">
                                        {currentTrack.title}
                                    </h3>
                                    <p className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest">
                                        {currentTrack.artist}
                                    </p>
                                </div>

                                <div className="mb-4 relative z-10 group px-1">
                                    <div
                                        className="h-1 w-full bg-muted rounded-full overflow-hidden cursor-pointer"
                                        onClick={(event) => {
                                            const sound = howlRef.current;
                                            if (!sound || duration <= 0) {
                                                return;
                                            }

                                            const rect = event.currentTarget.getBoundingClientRect();
                                            const x = event.clientX - rect.left;
                                            const ratio = Math.max(0, Math.min(1, x / rect.width));
                                            const nextTime = ratio * duration;
                                            sound.seek(nextTime);
                                            setCurrentTime(nextTime);
                                            setProgress(ratio * 100);
                                        }}
                                    >
                                        <div
                                            className="h-full bg-[#E91E63] transition-all duration-100 ease-linear shadow-[0_0_8px_#E91E63]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[9px] font-mono text-muted-foreground mt-1.5">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between relative z-10 px-1">
                                    <button
                                        onClick={toggleLoop}
                                        className={cn(
                                            'p-1.5 transition-colors',
                                            loopMode !== 'off'
                                                ? 'text-[#E91E63]'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        {loopMode === 'one' ? (
                                            <Repeat1 className="w-3.5 h-3.5" />
                                        ) : (
                                            <Repeat className="w-3.5 h-3.5" />
                                        )}
                                    </button>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={handlePrev}
                                            className="text-foreground hover:text-foreground/70 transition-colors"
                                        >
                                            <SkipBack className="w-5 h-5 fill-current" />
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-4 h-4 fill-current" />
                                            ) : (
                                                <Play className="w-4 h-4 fill-current ml-0.5" />
                                            )}
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="text-foreground hover:text-foreground/70 transition-colors"
                                        >
                                            <SkipForward className="w-5 h-5 fill-current" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-1.5 group/vol">
                                        <button
                                            onClick={() => setVolume((v) => (v === 0 ? 0.25 : 0))}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {volume === 0 ? (
                                                <VolumeX className="w-3.5 h-3.5" />
                                            ) : (
                                                <Volume2 className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                        <div className="w-0 overflow-hidden group-hover/vol:w-12 transition-all duration-300">
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={(event) =>
                                                    setVolume(parseFloat(event.target.value))
                                                }
                                                className="w-12 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-[#E91E63]"
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
                                className="group flex items-center gap-3 bg-card/80 backdrop-blur-md border border-border pr-5 pl-1.5 py-1.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                            >
                                <motion.div
                                    animate={{ rotate: isPlaying ? 360 : 0 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    className="w-8 h-8 rounded-full border border-border overflow-hidden relative shadow-inner shrink-0"
                                >
                                    <Image
                                        src={currentTrack.cover}
                                        alt="Cover"
                                        fill
                                        sizes="32px"
                                        className="object-cover"
                                    />
                                </motion.div>

                                <div className="flex flex-col items-start z-10 overflow-hidden">
                                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#E91E63] flex items-center gap-1">
                                        <span
                                            className={cn(
                                                'w-1 h-1 rounded-full bg-[#E91E63]',
                                                isPlaying && 'animate-pulse'
                                            )}
                                        />
                                        Now Playing
                                    </span>
                                    <div className="relative w-[100px] h-[16px] overflow-hidden">
                                        <span className="text-[10px] font-bold uppercase text-card-foreground truncate w-full absolute top-0 left-0">
                                            {currentTrack.title}
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}
