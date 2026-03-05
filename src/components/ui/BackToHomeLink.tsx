import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackToHomeLinkProps {
    className?: string;
    href?: string;
    label?: string;
}

export function BackToHomeLink({ className, href = "/", label = "Back to Home" }: BackToHomeLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                'group flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-border/50 bg-secondary/50 hover:bg-foreground hover:border-foreground transition-all duration-300',
                className
            )}
        >
            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-background transition-colors" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-medium text-foreground/80 group-hover:text-background transition-colors">
                {label}
            </span>
        </Link>
    );
}
