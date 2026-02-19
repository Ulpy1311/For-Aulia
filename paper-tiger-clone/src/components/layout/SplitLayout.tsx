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
                'grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 relative',
                className
            )}
        >
            {/* Sticky Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-32 self-start h-auto transition-all duration-500">
                {leftContent}
            </div>

            {/* Scrollable Right Column */}
            <div className="lg:col-span-7 flex flex-col gap-8 min-w-0">
                {rightContent}
            </div>
        </div>
    );
}
