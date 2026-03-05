import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { BackToHomeLink } from '@/components/ui/BackToHomeLink';
import { primaryNavItems } from '@/lib/navigation';

export function ChangelogContent() {
    const quickLinks = primaryNavItems.filter((item) => item.href !== '/changelog');

    return (
        <div className="flex flex-col gap-8 w-full max-w-md py-12 md:py-0 sticky top-24 h-fit">
            <div className="flex flex-col gap-6">
                <BackToHomeLink className="mb-4" />

                <h1 className="uppercase text-foreground max-w-[13ch]">
                    <span className="block font-mono text-[10px] md:text-xs tracking-[0.38em] text-muted-foreground mb-2 md:mb-3">
                        PAGE FIVE
                    </span>
                    <span className="block font-display text-[clamp(3.2rem,9.8vw,6.3rem)] leading-[0.82] tracking-[-0.01em]">
                        CHANGE
                    </span>
                    <span className="block font-serif italic text-[clamp(2.1rem,7vw,4rem)] leading-[0.95] tracking-[0.08em] text-foreground/85 -mt-1 md:-mt-2">
                        LOG
                    </span>
                    <span className="block mt-3 h-px w-28 bg-foreground/25" />
                </h1>

                <div className="space-y-5 mt-2">
                    <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-[1.2] tracking-tight text-balance [text-align:justify]">
                        Halaman ini menyimpan jejak pengembangan website ini dari versi awal sampai versi terbaru.
                    </p>
                    <p className="font-serif text-base md:text-lg text-foreground/60 leading-relaxed [text-align:justify]">
                        Semua perubahan dicatat biar prosesnya transparan. Mulai dari perbaikan kecil, penyempurnaan UI, sampai upgrade fitur utama.
                    </p>
                    <p className="font-serif text-sm md:text-base text-foreground/50 leading-relaxed">
                        Scroll untuk lihat daftar perubahan versi.
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3 -mt-1">
                    {['Rilis', 'Perbaikan', 'Evolusi'].map((tag) => (
                        <span
                            key={tag}
                            className="bg-secondary px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-secondary-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="max-w-none text-muted-foreground font-serif text-base leading-relaxed border-t border-border pt-8">
                    <p className="[text-align:justify]">
                        Changelog ini jadi catatan perkembangan yang konsisten. Tujuannya agar setiap update punya konteks yang jelas.
                    </p>
                    <p className="mt-4 [text-align:justify]">
                        Kamu tetap bisa buka halaman lain lewat navigasi cepat di bawah.
                    </p>
                </div>
            </div>

            {/* Quick Navigation */}
            <div className="flex flex-col gap-3 border-t border-border pt-6">
                {quickLinks.map((item, index) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group border-2 border-border/80 bg-card p-4 hover:bg-foreground hover:text-background transition-all flex flex-col justify-between h-20 rounded-xl"
                    >
                        <div className="flex justify-between items-start w-full">
                            <span className="text-xs font-mono uppercase tracking-widest opacity-60">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="font-display text-2xl uppercase tracking-tight">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
