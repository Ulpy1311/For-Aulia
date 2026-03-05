import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'outline' | 'solid';
    className?: string;
    withArrow?: boolean;
    href?: string;
}

export function Button({
    children,
    variant = 'outline',
    className,
    withArrow = false,
    href,
    ...props
}: ButtonProps) {
    const baseStyles = cn(
        'group inline-flex items-center justify-between transition-all duration-300 px-6 py-3 cursor-pointer',
        variant === 'outline' &&
        'border border-primary hover:bg-primary hover:text-primary-foreground',
        variant === 'solid' &&
        'bg-primary text-primary-foreground hover:bg-primary/90',
        className
    );

    const content = (
        <>
            <span className="font-display text-sm tracking-wider uppercase italic">
                {children}
            </span>
            {withArrow && (
                <ArrowRight className="ml-4 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={baseStyles}>
                {content}
            </Link>
        );
    }

    return (
        <button className={baseStyles} {...props}>
            {content}
        </button>
    );
}
