import { SplitLayout } from '@/components/layout/SplitLayout';
import { StoryGrid } from '@/components/features/story/StoryGrid';
import { getMemories } from '@/lib/story-service';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';

export default function StoryPage() {
    const memoriesPromise = getMemories();

    const leftContent = (
        <div className="flex flex-col gap-6 w-full max-w-md py-12 md:py-0 sticky top-24 h-fit">
            <BackToHomeLink className="mb-4" />

            <h1 className="uppercase text-foreground max-w-[13ch]">
                <span className="block font-mono text-[10px] md:text-xs tracking-[0.38em] text-muted-foreground mb-2 md:mb-3">
                    PAGE TWO
                </span>
                <span className="block font-display text-[clamp(3.2rem,9.8vw,6.3rem)] leading-[0.82] tracking-[-0.01em]">
                    ABOUT
                </span>
                <span className="block font-serif italic text-[clamp(2.1rem,7vw,4rem)] leading-[0.95] tracking-[0.08em] text-foreground/85 -mt-1 md:-mt-2">
                    US
                </span>
                <span className="block mt-3 h-px w-28 bg-foreground/25" />
            </h1>

            <div className="space-y-5 mt-2">
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-[1.2] tracking-tight text-balance">
                    Halaman ini berisi perjalanan LDR kita dari awal kenal sampai sekarang. Semuanya dimulai dari obrolan kecil di Agustus 2024.
                </p>
                <p className="font-serif text-base md:text-lg text-foreground/60 leading-relaxed">
                    Kita belum pernah ketemu langsung, tapi setiap chat, call, marah, dan baikan jadi bukti kalau rasa ini tetap tumbuh meski jarak jauh.
                </p>
                <p className="font-serif text-sm md:text-base text-foreground/50 leading-relaxed">
                    Buka kartu mana saja buat lihat fase cerita kita.
                </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 -mt-1">
                {['LDR', 'Jarak', 'Bertahan', 'Kita'].map((tag) => (
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
                    Aku tulis semua ini supaya cerita kita tetap utuh. Bukan buat nyalahin siapa pun, tapi buat nginget kalau kita sama-sama berjuang dari jarak yang tidak dekat.
                </p>
                <p className="mt-4">
                    Dari awal ketemu sampai fase paling berat, semuanya ada di sini.
                </p>
            </div>
        </div>
    );

    const rightContent = (
        <>
            <StoryGrid memoriesPromise={memoriesPromise} />
        </>
    );

    return (
        <main className="page-shell">
            <SplitLayout leftContent={leftContent} rightContent={rightContent} />
        </main>
    );
}
