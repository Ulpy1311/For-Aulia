import { create } from 'zustand';

interface UIState {
    isMusicPlayerOpen: boolean;
    setMusicPlayerOpen: (isOpen: boolean) => void;
    hasEntryDismissed: boolean;
    setEntryDismissed: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMusicPlayerOpen: false,
    setMusicPlayerOpen: (isOpen) => set({ isMusicPlayerOpen: isOpen }),
    hasEntryDismissed: false,
    setEntryDismissed: () => set({ hasEntryDismissed: true }),
}));
