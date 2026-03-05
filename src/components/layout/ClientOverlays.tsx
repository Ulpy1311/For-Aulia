'use client';

import dynamic from 'next/dynamic';
import { EntryExperienceModal } from '@/components/ui/EntryExperienceModal';

const CustomContextMenu = dynamic(
  () => import('@/components/ui/CustomContextMenu').then((mod) => mod.CustomContextMenu),
  { ssr: false }
);

const MusicPlayer = dynamic(
  () => import('@/components/features/MusicPlayer').then((mod) => mod.MusicPlayer),
  { ssr: false }
);

export function ClientOverlays() {
  return (
    <>
      <CustomContextMenu />
      <MusicPlayer />
      <EntryExperienceModal />
    </>
  );
}
