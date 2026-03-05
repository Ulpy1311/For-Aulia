export interface GalleryItem {
    id: string;
    title: string;
    image: string;
    description: string;
}

// 50 seeded random placeholders
export const galleryData: GalleryItem[] = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1).padStart(2, '0'),
    title: `MOMENT ${i + 1}`,
    image: `https://picsum.photos/seed/for-aulia-gallery-${i + 1}/1600/1000`,
    description: `Random placeholder photo #${i + 1}. You can replace this with your original gallery memory later.`,
}));
