'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Instagram, Globe, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeveloperModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DeveloperModal({ isOpen, onClose }: DeveloperModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('apy.dev');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-foreground"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-border text-card-foreground w-full max-w-md rounded-xl overflow-hidden shadow-2xl relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8">
                                {/* Header / Developer Profile */}
                                <div className="flex flex-col items-center text-center mb-8">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                        <span className="font-display text-2xl font-bold">A</span>
                                    </div>
                                    <h3 className="font-display text-2xl uppercase tracking-wider mb-1">Developer</h3>
                                    <p className="text-muted-foreground text-sm font-mono">Crafted with passion & purpose</p>
                                </div>

                                {/* Copy Link Section */}
                                <button
                                    onClick={handleCopy}
                                    className="w-full bg-muted/30 border border-border hover:bg-muted/50 transition-all rounded-lg p-4 flex items-center justify-between group mb-6"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#5865F2]/10 p-2 rounded-md shadow-sm border border-[#5865F2]/20">
                                            {/* Discord Icon */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5 text-[#5865F2]"
                                            >
                                                <path d="M9 12h6m-6 0c0-2.5 3-4 3-4s3 1.5 3 4m-9 4h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2Z" />
                                                <path d="M7.5 12a4.5 4.5 0 1 1 5.3 4.2" stroke="none" /> {/* Fake filler path, switching to real Discord path below in next edit if needed, but actually I'll use the 'Message' icon from Lucide as 'Discord' fallback if I can't inline a massive path securely. Wait, I can inline the path I found. */}
                                                <path d="M18.894 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.09 2.157 2.418 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.09 2.157 2.418 0 1.334-.946 2.42-2.157 2.42z" fill="currentColor" stroke="none" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Discord</p>
                                            <p className="font-mono text-lg">apy.dev</p>
                                        </div>
                                    </div>
                                    <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    </div>
                                </button>

                                {/* Instagram Link */}
                                <a
                                    href="https://www.instagram.com/youbpyy/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-muted/30 border border-border hover:bg-muted/50 transition-all rounded-lg p-4 flex items-center gap-3 mb-8 group"
                                >
                                    <div className="bg-background p-2 rounded-md shadow-sm border border-border">
                                        <Instagram className="w-5 h-5" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Instagram</p>
                                        <p className="font-mono text-lg">@youbpyy</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </a>

                                {/* Heartfelt Message */}
                                <div className="border-t border-border pt-6">
                                    <p className="font-serif italic text-muted-foreground leading-relaxed text-sm text-center">
                                        &quot;Website ini dibuat dengan sepenuh hati dan perasaan.
                                        Proses membangun website ini bukan sekadar coding, tapi juga proses introspeksi dan berdamai dengan diri sendiri.
                                        Semoga website ini bisa terus berdiri sebagai jejak perasaan yang nyata untuk Cantika Intan Aulia.&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
