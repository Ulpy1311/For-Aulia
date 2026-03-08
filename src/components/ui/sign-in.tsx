'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';


export interface SignInPageProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    heroImageSrc?: string;
    onSignIn?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-primary/50 focus-within:bg-foreground/10">
        {children}
    </div>
);

export const SignInPage: React.FC<SignInPageProps> = ({
    title = <span className="font-light text-foreground tracking-tighter">Admin Access</span>,
    description = "Sign in to manage memories, logs, and settings.",
    heroImageSrc,
    onSignIn,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            if (onSignIn) {
                await onSignIn(e);
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[100dvh] flex flex-col md:flex-row font-sans w-full bg-background text-foreground overflow-hidden">
            {/* Left column: sign-in form */}
            <section className="flex-1 flex items-center justify-center p-8 z-10">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <div className="mb-2">
                            <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 text-4xl md:text-5xl font-serif tracking-tight leading-tight">
                                {title}
                            </h1>
                            <p className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 text-muted-foreground mt-2">
                                {description}
                            </p>
                        </div>

                        {error && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                                <GlassInputWrapper>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="admin@example.com"
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50"
                                    />
                                </GlassInputWrapper>
                            </div>

                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
                                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Password</label>
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            placeholder="••••••••"
                                            className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center justify-center w-10 h-full rounded-xl hover:bg-foreground/5 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                                            ) : (
                                                <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                                            )}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 w-full rounded-2xl bg-foreground text-background py-4 font-medium hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
                            >
                                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Right column: hero image (Aesthetics matching the overall site) */}
            {heroImageSrc && (
                <section className="hidden md:block flex-1 relative p-4">
                    <div className="absolute inset-4 rounded-[2rem] overflow-hidden bg-muted">
                        <div
                            className="absolute inset-0 bg-cover bg-center animate-in fade-in zoom-in-95 duration-1000 delay-300"
                            style={{
                                backgroundImage: `url(${heroImageSrc})`,
                                filter: 'contrast(1.1) brightness(0.9) grayscale(20%)',
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    </div>
                </section>
            )}
        </div>
    );
};
