# For Aulia - Project Handoff

Last updated: March 6, 2026

## Overview
For Aulia is a cinematic, narrative-driven Next.js website focused on memory, closure, and emotional storytelling.
The project combines high-motion visuals, long-form narrative pages, and a custom music player.

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- GSAP + Lenis
- Howler.js
- Zustand

## Active Routes
- `/` landing page
- `/story` story cards and detail modal
- `/gallery` photo grid and detail modal
- `/notes` bilingual long-form note page
- `/changelog` product iteration timeline

## Core File Map
- `src/app/layout.tsx` global shell, providers, navbar/footer, entry modal
- `src/components/layout/ClientOverlays.tsx` client-only global overlays and deferred chrome
- `src/components/ui/reveal-wave-image.tsx` landing image-sequence renderer
- `src/components/features/story/StoryGrid.tsx` story cards and modal
- `src/components/ui/slideshow.tsx` gallery slideshow experience
- `src/components/features/MusicPlayer.tsx` audio player logic and UI
- `src/components/features/ChangelogList.tsx` in-app changelog source of truth
- `src/lib/story-data.ts` memory dataset
- `src/lib/navigation.ts` shared primary navigation config

## Run Locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Gates
```bash
npm run lint
npm run build
```

Current status on March 6, 2026: both commands pass.

## Notes
- Browser autoplay with sound is policy-dependent; first audio interaction can vary by browser.
- Landing page image-sequence now renders the first frame immediately, then preloads the remaining frames in the background.
