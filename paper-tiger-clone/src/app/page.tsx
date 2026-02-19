import { SplitLayout } from '@/components/layout/SplitLayout';
import { LeftColumnContent } from '@/components/features/LeftColumnContent';
import { HeroSection } from '@/components/features/HeroSection';
import {
  PromoGrid,
  FavoritingSection,
  AppDownloadSection,
  MenuGrid,
  ParallaxCTA,
} from '@/components/features/ContentSections';
import { RelatedClients } from '@/components/features/RelatedClients';

export default function Home() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <SplitLayout
        leftContent={<LeftColumnContent />}
        rightContent={
          <>
            <HeroSection />
            <PromoGrid />
            <FavoritingSection />
            <AppDownloadSection />
            <MenuGrid />
            <ParallaxCTA />
          </>
        }
      />

      <RelatedClients />
    </main>
  );
}
