import { SplitLayout } from '@/components/layout/SplitLayout';
import { ChangelogContent } from '@/components/features/ChangelogContent';
import { ChangelogList } from '@/components/features/ChangelogList';

export default function ChangelogPage() {
    return (
        <main className="page-shell">
            <SplitLayout
                leftContent={<ChangelogContent />}
                rightContent={<ChangelogList />}
            />
        </main>
    );
}
