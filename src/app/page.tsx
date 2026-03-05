'use client';

import { SplitLayout } from '@/components/layout/SplitLayout';
import { LeftColumnContent } from '@/components/features/LeftColumnContent';
import { RevealWaveImage } from '@/components/ui/reveal-wave-image';
import { RelatedClients } from '@/components/features/RelatedClients';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="page-shell">
      <SplitLayout
        leftContent={<LeftColumnContent />}
        rightContent={
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <RevealWaveImage
              waveSpeed={0.2}
              waveFrequency={0.7}
              waveAmplitude={0.5}
              revealRadius={0.5}
              revealSoftness={1}
              pixelSize={2}
              mouseRadius={0.4}
            />
          </motion.div>
        }
      />

      <RelatedClients />
    </main>
  );
}
