'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Repeat1, ChevronDown, Music as MusicIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Track {
    title: string;
    artist: string;
    src: string;
    cover: string;
}

const playlist: Track[] = [
    {
        title: 'Someone to Stay',
        artist: 'Vancouver Sleep Clinic',
        src: '/Music/Vancouver Sleep Clinic - Someone to Stay (Official Video).mp3',
        cover: 'https://images.genius.com/cada2c76ec4da5bf14606994bcfdc305.1000x1000x1.jpg'
    },
    {
        title: "Where's My Love",
        artist: 'SYML',
        src: "/Music/SYML - Where's My Love.mp3",
        cover: 'https://i1.sndcdn.com/artworks-000199178898-louuv3-t500x500.jpg'
    }
];

type LoopMode = 'off' | 'all' | 'one';

export function MusicPlayer() {
    const [hasStarted, setHasStarted] = useState(false); // New: Intro state
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.25);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loopMode, setLoopMode] = useState<LoopMode>('off');
    const [showNotification, setShowNotification] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack = playlist[currentTrackIndex];

    // Blur Effect Logic
    useEffect(() => {
        const target = document.getElementById('main-content'); // Targeted wrapper

        // Blur if Intro is active OR Player is expanded
        const shouldBlur = !hasStarted || isOpen;

        if (target) {
            target.style.transition = 'filter 0.5s ease, opacity 0.5s ease';

            if (shouldBlur) {
                target.style.filter = 'blur(10px) brightness(0.8)';
                target.style.pointerEvents = 'none';
            } else {
                target.style.filter = 'none';
                target.style.pointerEvents = 'auto';
            }
        }

        // Cleanup
        return () => {
            if (target) {
                target.style.filter = 'none';
                target.style.pointerEvents = 'auto';
            }
        }
    }, [hasStarted, isOpen]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Song Change Notification
    useEffect(() => {
        if (hasStarted && isPlaying) {
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [currentTrackIndex, isPlaying, hasStarted]);

    const handleStart = () => {
        setHasStarted(true);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(console.error);
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(console.error);
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setProgress((current / total) * 100);
            setDuration(total);
        }
    };

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    const handleEnded = () => {
        if (loopMode === 'one') {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else if (loopMode === 'all') {
            handleNext();
        } else {
            if (currentTrackIndex < playlist.length - 1) {
                handleNext();
            } else {
                setIsPlaying(false);
            }
        }
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
            <audio
                ref={audioRef}
                src={currentTrack.src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            {/* INTRO OVERLAY */}
            <AnimatePresence>
                {!hasStarted && (
                    <motion.div
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-transparent" // Layout handles blur
                        exit={{ opacity: 0, pointerEvents: "none" }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0, y: 100 }} // Animate out downwards
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-[#1A1A1A] text-white p-8 rounded-3xl shadow-2xl max-w-sm w-full relative border border-white/5"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#E91E63]/20 flex items-center justify-center text-[#E91E63]">
                                    <MusicIcon className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold">Music On! 🎵</h2>
                            </div>

                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Suara lagunya terlalu keras? Kamu bisa <strong className="text-white">mengecilkan</strong> atau <strong className="text-white">mematikannya</strong> lewat tombol di kanan bawah ya.
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="text-xs text-[#E91E63] flex items-center gap-1 group cursor-pointer hover:underline">
                                    <span className="rotate-45 block">↗</span> Controls di sana
                                </span>
                                <button
                                    onClick={handleStart}
                                    className="bg-[#E91E63] hover:bg-[#D81B60] text-white px-6 py-2.5 rounded-full font-medium transition-transform active:scale-95 shadow-lg shadow-[#E91E63]/30"
                                >
                                    Oke, Mengerti
                                </button>
                            </div>

                            {/* Decorative Arrow Hint (Visual only) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="absolute -bottom-20 -right-10 hidden md:flex flex-col items-center gap-2 pointer-events-none opacity-50"
                            >
                                <div className="w-px h-12 bg-white/20 border-l border-dashed border-white/40" />
                                <ChevronDown className="w-4 h-4 text-white/40" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* FLOATING PLAYER (Visible after start) */}
            <AnimatePresence>
                {hasStarted && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-0 right-0 z-50 flex flex-col items-end p-6 pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            {/* Song Start Notification */}
                            <AnimatePresence>
                                {showNotification && isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 0, x: 20 }}
                                        animate={{ opacity: 1, y: -100, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute right-0 bg-[#1A1A1A]/90 text-white px-4 py-3 rounded-xl backdrop-blur-md border border-white/5 shadow-xl flex items-center gap-3 w-max max-w-xs z-40"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                            <Image
                                                src={currentTrack.cover}
                                                alt="Cover"
                                                width={40}
                                                height={40}
                                                className="rounded-lg object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[10px] uppercase font-bold text-[#E91E63]">Now Playing</p>
                                            <p className="text-sm font-bold truncate max-w-[150px]">{currentTrack.title}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="expanded"
                                        initial={{ y: "120%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: "120%", opacity: 0 }}
                                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                        className="bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl p-6 w-[340px] overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

                                        {/* Header */}
                                        <div className="flex justify-between items-center mb-6 relative z-10">
                                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">Player</span>
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="text-white/30 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                                            >
                                                <ChevronDown className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Album Art */}
                                        <div className="flex justify-center mb-8 relative z-10">
                                            <motion.div
                                                animate={{ rotate: isPlaying ? 360 : 0 }}
                                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                                className={cn("w-48 h-48 rounded-full border-[6px] border-[#111] shadow-2xl overflow-hidden relative", !isPlaying && "play-paused")}
                                                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                                            >
                                                <Image src={currentTrack.cover} alt={currentTrack.title} fill className="object-cover" />
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#111] rounded-full border border-white/5 z-10 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                                            </motion.div>
                                        </div>

                                        {/* Info */}
                                        <div className="text-center mb-6 relative z-10">
                                            <h3 className="font-display text-2xl font-bold uppercase truncate text-white mb-1 tracking-tight">{currentTrack.title}</h3>
                                            <p className="text-xs font-mono font-medium text-white/50 uppercase tracking-widest">{currentTrack.artist}</p>
                                        </div>

                                        {/* Progress */}
                                        <div className="mb-6 relative z-10 group">
                                            <div
                                                className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden cursor-pointer"
                                                onClick={(e) => {
                                                    if (audioRef.current) {
                                                        const rect = e.currentTarget.getBoundingClientRect();
                                                        const x = e.clientX - rect.left;
                                                        audioRef.current.currentTime = (x / rect.width) * audioRef.current.duration;
                                                    }
                                                }}
                                            >
                                                <div className="h-full bg-[#E91E63] transition-all duration-100 ease-linear shadow-[0_0_10px_#E91E63]" style={{ width: `${progress}%` }} />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-mono text-white/30 mt-2">
                                                <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                                                <span>{formatTime(duration)}</span>
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        <div className="flex items-center justify-between relative z-10">
                                            <button onClick={toggleLoop} className={cn("p-2 transition-colors", loopMode !== 'off' ? "text-[#E91E63]" : "text-white/30 hover:text-white")}>
                                                {loopMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                                            </button>

                                            <div className="flex items-center gap-4">
                                                <button onClick={handlePrev} className="text-white hover:text-white/70 transition-colors"><SkipBack className="w-6 h-6 fill-current" /></button>
                                                <button onClick={togglePlay} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                                                </button>
                                                <button onClick={handleNext} className="text-white hover:text-white/70 transition-colors"><SkipForward className="w-6 h-6 fill-current" /></button>
                                            </div>

                                            <div className="flex items-center gap-2 group/vol">
                                                <button onClick={() => setVolume(v => v === 0 ? 0.25 : 0)} className="text-white/30 hover:text-white transition-colors">
                                                    {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                                </button>
                                                <div className="w-0 overflow-hidden group-hover/vol:w-16 transition-all duration-300">
                                                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E91E63]" />
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
                                        onMouseEnter={() => setIsOpen(true)}
                                        className="group flex items-center gap-3 bg-[#1A1A1A]/80 backdrop-blur-md border border-white/5 pr-6 pl-2 py-2 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                                    >
                                        {/* Spinning Disc Mini */}
                                        <motion.div
                                            animate={{ rotate: isPlaying ? 360 : 0 }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="w-10 h-10 rounded-full border border-white/10 overflow-hidden relative shadow-inner shrink-0"
                                        >
                                            <Image src={currentTrack.cover} alt="Cover" fill className="object-cover" />
                                        </motion.div>

                                        <div className="flex flex-col items-start z-10">
                                            <span className="text-[9px] font-mono uppercase tracking-widest text-[#E91E63] flex items-center gap-1.5 ">
                                                <span className={cn("w-1.5 h-1.5 rounded-full bg-[#E91E63]", isPlaying && "animate-pulse")} />
                                                Now Playing
                                            </span>
                                            <span className="text-xs font-bold uppercase text-white max-w-[120px] truncate">
                                                {currentTrack.title}
                                            </span>
                                        </div>
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
