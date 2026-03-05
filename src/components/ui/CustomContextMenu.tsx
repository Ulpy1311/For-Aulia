'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Moon, Sun, Globe, Image as ImageIcon, BookOpenText, List } from 'lucide-react';
import { DeveloperModal } from './DeveloperModal';
import { useThemeTransition } from '@/components/animations/ThemeTransition';
import { primaryNavItems } from '@/lib/navigation';

export function CustomContextMenu() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { theme } = useTheme();
    const { toggleTheme } = useThemeTransition();
    const routeIcons: Record<string, React.ReactNode> = {
        '/story': <BookOpen className="w-4 h-4" />,
        '/gallery': <ImageIcon className="w-4 h-4" />,
        '/notes': <BookOpenText className="w-4 h-4" />,
        '/changelog': <List className="w-4 h-4" />,
    };

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();

            // Calculate position to keep menu within viewport
            let x = e.clientX;
            let y = e.clientY;

            const menuWidth = 220;
            const menuHeight = 320; // Increased height for new items

            if (x + menuWidth > window.innerWidth) {
                x = window.innerWidth - menuWidth;
            }

            if (y + menuHeight > window.innerHeight) {
                y = window.innerHeight - menuHeight;
            }

            setPosition({ x, y });
            setVisible(true);
        };

        const handleClick = () => {
            setVisible(false);
        };

        const handleScroll = () => {
            setVisible(false);
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    type MenuActionEvent = React.MouseEvent<HTMLButtonElement>;
    const routeMenuItems = primaryNavItems.map((item) => ({
        label: `View ${item.label}`,
        icon: routeIcons[item.href],
        action: () => router.push(item.href),
    }));

    const menuItems: { label: string; icon: React.ReactNode; action: (e?: MenuActionEvent) => void }[] = [
        ...(pathname !== '/' ? [{
            label: 'Back to Home',
            icon: <ArrowLeft className="w-4 h-4" />,
            action: () => router.push('/')
        }] : []),
        ...routeMenuItems,
        {
            label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
            icon: theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
            action: (e?: MenuActionEvent) => toggleTheme(e)
        },
        {
            label: 'Say Hello',
            icon: <Globe className="w-4 h-4" />,
            action: () => setIsDeveloperModalOpen(true)
        }
    ];

    return (
        <>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        style={{ top: position.y, left: position.x }}
                        className="fixed z-[100] min-w-[220px] bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-xl overflow-hidden py-1"
                    >
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Pass the event to the action if it expects it (for theme toggle coordinates)
                                    item.action(e);
                                    setVisible(false);
                                }}
                                className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors text-left"
                            >
                                <span className="text-muted-foreground group-hover:text-foreground">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </button>
                        ))}

                    </motion.div>
                )}
            </AnimatePresence>

            <DeveloperModal
                isOpen={isDeveloperModalOpen}
                onClose={() => setIsDeveloperModalOpen(false)}
            />
        </>
    );
}
