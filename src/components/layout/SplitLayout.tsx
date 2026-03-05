import { cn } from '@/lib/utils';
import React from 'react';

interface SplitLayoutProps {
    leftContent: React.ReactNode;
    rightContent: React.ReactNode;
    className?: string;
}

export function SplitLayout({
    leftContent,
    rightContent,
    className,
}: SplitLayoutProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-1 lg:grid-cols-12 gap-[clamp(2rem,2.6vw,4.5rem)] mb-16 relative',
                className
            )}
        >
            {/* Sticky Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-24 self-start h-auto transition-all duration-500 max-w-md">
                {leftContent}
            </div>

            {/* Scrollable Right Column */}
            <div className="lg:col-span-7 flex flex-col gap-8 min-w-0">
                {rightContent}
            </div>
        </div>
    );
}
