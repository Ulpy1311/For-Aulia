import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function LeftColumnContent() {
    return (
        <div className="flex flex-col gap-8">
            <a
                href="#"
                className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 hover:text-foreground transition-colors flex items-center gap-2"
            >
                <ArrowLeft className="w-3 h-3" /> Back to Gallery
            </a>

            <h1 className="font-display text-6xl md:text-7xl uppercase leading-[0.85] tracking-tight text-foreground text-brand-primary">
                PAGE ONE
            </h1>

            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-snug">
                A digital space dedicated to <span className="text-foreground font-bold">Cantika Intan Aulia</span>.
                Here, every pixel tells a story, and every interaction is a tribute to her journey.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {['Dreamer', 'Creative', 'Inspiring'].map((tag) => (
                    <span
                        key={tag}
                        className="bg-secondary px-3 py-1 text-[10px] font-mono uppercase tracking-wider font-bold text-secondary-foreground"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm leading-relaxed border-t border-border pt-8">
                <p>
                    This isn&apos;t just a website; it&apos;s a digital canvas dedicated to Cantika Intan Aulia.
                    A space to celebrate her journey, her achievements, and the unique light she brings to the world.
                    From her aspirations to her daily inspirations, every element here reflects the elegance and
                    strength that defines her.
                </p>
                <p className="mt-4">
                    Explore the moments that matter, the stories that shape her, and the vision she holds for the future.
                    Welcome to her world.
                </p>
            </div>

            <Button withArrow href="#">
                Explore Her Story
            </Button>
        </div>
    );
}
