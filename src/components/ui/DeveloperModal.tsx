'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ArrowUpRight } from 'lucide-react';

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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                    />

                    <div className="fixed inset-0 z-[51] grid place-items-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="pointer-events-auto w-full max-w-md bg-card border border-border text-card-foreground rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* Top bar */}
                            <div className="flex items-center justify-between px-6 pt-6">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                    Contact
                                </span>
                                <button
                                    onClick={onClose}
                                    className="h-7 w-7 rounded-full border border-border inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="px-6 pt-6 pb-8">
                                {/* Heading */}
                                <h3 className="font-display text-[clamp(2rem,6vw,2.8rem)] uppercase leading-[0.85] tracking-tight mb-1">
                                    Get in
                                </h3>
                                <h3 className="font-serif italic text-[clamp(1.6rem,5vw,2.2rem)] leading-[0.9] tracking-[0.04em] text-foreground/80 mb-8">
                                    Touch
                                </h3>

                                {/* Contact links */}
                                <div className="space-y-3 mb-8">
                                    <button
                                        onClick={handleCopy}
                                        className="w-full group flex items-center justify-between py-4 border-t border-border hover:pl-2 transition-all duration-300"
                                    >
                                        <div className="text-left">
                                            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1 flex items-center gap-1.5">
                                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true"><path d="M18.894 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.09 2.157 2.418 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.09 2.157 2.418 0 1.334-.946 2.42-2.157 2.42z" /></svg>
                                                Discord
                                            </p>
                                            <p className="font-serif text-lg text-foreground">
                                                apy.dev
                                            </p>
                                        </div>
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </span>
                                    </button>

                                    <a
                                        href="https://www.instagram.com/youbpyy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full group flex items-center justify-between py-4 border-t border-border hover:pl-2 transition-all duration-300"
                                    >
                                        <div className="text-left">
                                            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1 flex items-center gap-1.5">
                                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                                                Instagram
                                            </p>
                                            <p className="font-serif text-lg text-foreground">
                                                @youbpyy
                                            </p>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </a>
                                </div>

                                {/* Quote */}
                                <div className="border-t border-border pt-6">
                                    <p className="font-serif italic text-sm text-foreground/60 leading-relaxed">
                                        &ldquo;Built with full heart and real emotion. Not just code, but reflection and learning to make peace with myself. For <span className="text-foreground font-medium not-italic">Cantika Intan Aulia</span>.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
