import { SplitLayout } from '@/components/layout/SplitLayout';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import Slideshow, { type SlideshowItem } from '@/components/ui/slideshow';
import { galleryData } from '@/lib/gallery-data';

export default function GalleryPage() {
    const slideshowItems: SlideshowItem[] = galleryData.map((item) => ({
        id: item.id,
        img: item.image,
        text: ['OUR GALLERY', item.title],
    }));

    const leftContent = (
        <div className="flex flex-col gap-6 w-full max-w-md py-12 md:py-0 sticky top-24 h-fit">
            <BackToHomeLink className="mb-4" />

            <h1 className="uppercase text-foreground max-w-[13ch]">
                <span className="block font-mono text-[10px] md:text-xs tracking-[0.38em] text-muted-foreground mb-2 md:mb-3">
                    PAGE THREE
                </span>
                <span className="block font-display text-[clamp(3.2rem,9.8vw,6.3rem)] leading-[0.82] tracking-[-0.01em]">
                    OUR
                </span>
                <span className="block font-serif italic text-[clamp(2.1rem,7vw,4rem)] leading-[0.95] tracking-[0.08em] text-foreground/85 -mt-1 md:-mt-2">
                    GALLERY
                </span>
                <span className="block mt-3 h-px w-28 bg-foreground/25" />
            </h1>

            <div className="space-y-5 mt-2">
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-[1.2] tracking-tight text-balance">
                    Koleksi momen mentah tanpa proses edit. Kenangan nyata yang tertangkap di tengah kehidupan.
                </p>
                <p className="font-serif text-base md:text-lg text-foreground/60 leading-relaxed">
                    Gulir ke bawah. Buka foto mana saja untuk melihat catatan di dalamnya.
                </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 -mt-1">
                {['Momen', 'Kandid', 'Milik Kita'].map((tag) => (
                    <span
                        key={tag}
                        className="bg-secondary px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-secondary-foreground"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="max-w-none text-muted-foreground font-serif text-base leading-relaxed border-t border-border pt-8">
                <p>
                    Ini foto yang terasa terlalu nyata untuk memakai filter. Ada yang buram dan ada yang presisi. Semuanya memiliki makna.
                </p>
            </div>
        </div>
    );

    const rightContent = (
        <div className="w-full space-y-4">
            <Slideshow slides={slideshowItems} />
            <div className="rounded-xl border border-border/70 bg-card/40 px-4 py-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    Total Photos Loaded
                </p>
                <p className="mt-1 font-serif text-base text-foreground/80">
                    {galleryData.length} random placeholder photos ready.
                </p>
            </div>
        </div>
    );

    return (
        <main className="page-shell">
            <SplitLayout leftContent={leftContent} rightContent={rightContent} />
        </main>
    );
}
