import { SplitLayout } from '@/components/layout/SplitLayout';
import { ChangelogContent } from '@/components/features/ChangelogContent';
import { getDbData } from '@/lib/db';

export default function ChangelogPage() {
    const db = getDbData();

    const changelogData = db.changelogs as {id: string, version: string, date: string, title: string, changes: string[]}[];

    const leftContent = <ChangelogContent />;

    const rightContent = (
        <div className="flex flex-col gap-6 md:gap-10">
            {changelogData.map((release, index) => (
                <div key={release.id || index} className="group relative border-l-2 border-border/50 pl-6 md:pl-8 pb-10 last:pb-0 hover:border-violet-500/30 transition-colors duration-500">
                    <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-background bg-border/80 group-hover:bg-violet-500/50 transition-colors duration-500" />

                    <div className="flex flex-col gap-4">
                        <header>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl md:text-2xl font-serif text-foreground tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                    {release.version}
                                </h2>
                                <time className="text-xs font-mono tracking-widest text-muted-foreground uppercase bg-secondary px-2 py-0.5 rounded-sm">
                                    {release.date}
                                </time>
                            </div>
                            <p className="font-sans text-sm md:text-base font-medium text-foreground/80 mt-2">
                                {release.title}
                            </p>
                        </header>

                        <ul className="space-y-3">
                            {release.changes.map((change: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3 font-sans text-sm md:text-base text-muted-foreground/90 leading-relaxed group-hover:text-foreground/80 transition-colors">
                                    <span className="text-violet-500/50 mt-1.5 text-[10px] uppercase font-mono tracking-widest leading-none">•</span>
                                    {change}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="page-shell">
            <SplitLayout leftContent={leftContent} rightContent={rightContent} />
        </main>
    );
}
