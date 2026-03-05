# Project Progress & Handoff - For Aulia

Last updated: March 6, 2026

## Purpose
This file records the latest execution state so future sessions can continue without re-discovery work.

## Completed in This Pass (v2.5.0)
- Removed dead files that were no longer referenced:
  - `src/components/ui/demo.tsx`
  - `src/components/features/gallery/GalleryGrid.tsx`
- Removed empty structural directories that were no longer used:
  - `scripts`
  - `src/app/api`
  - `src/components/features/home`
  - `src/components/features/gallery`
- Reduced initial client overhead by moving non-critical global UI into `src/components/layout/ClientOverlays.tsx`.
- Removed unused Google font `Lora` from `src/app/layout.tsx`.
- Reworked `RevealWaveImage` loading so the first frame appears immediately while the remaining sequence preloads in the background.
- Fixed stale lint issues in `src/lib/notes.tsx` and removed unused imports in `src/components/ui/reveal-wave-image.tsx`.
- Updated handoff docs to reflect the active gallery/slideshow structure and current performance pass.

## Completed in This Pass (v2.4.0)
- Rewrote `RevealWaveImage` to use the 80-frame scroll sequence and fixed object-fit scaling bugs.
- Removed duplicate `ScrollSequence` component since its logic was merged into `RevealWaveImage`.
- Updated `page.tsx` and `demo.tsx` to use the refactored component.
- Audited all source scripts in `src` and project configs.
- Removed duplicated navigation data by centralizing route items in `src/lib/navigation.ts`.
- Replaced repeated "Back to Home" link markup with shared component `src/components/ui/BackToHomeLink.tsx`.
- Removed redundant UI store state (`isManuallyPaused`) and cleaned related calls in `MusicPlayer`.
- Centralized repeated theme storage key in `src/lib/constants.ts`.
- Removed redundant `src/app/head.tsx` (icons already handled via metadata in layout).
- Updated dependencies to latest compatible versions:
  - `@tailwindcss/postcss` -> `4.2.1`
  - `framer-motion` -> `12.35.0`
  - `lenis` -> `1.3.18`
  - `tailwindcss` -> `4.2.1`
  - `eslint` pinned to `9.39.3` for compatibility with current Next lint stack
- Removed unused dependencies:
  - `@ai-sdk/openai`
  - `ai`
- Rewrote handoff docs to match actual active routes/modules.

## Validation
Executed on March 6, 2026:
- `npm run lint` -> pass
- `npm run build` -> pass
- `npm outdated` -> only `eslint` remains newer on v10, intentionally pinned on v9 for stable linting

## Current Active Routes
- `/`
- `/story`
- `/gallery`
- `/notes`
- `/changelog`

## Continuation Guide
1. **Next steps:** You can now safely focus on expanding the content (Story, Gallery) or adding new sections as the base components are extremely stable and unified.
2. Keep `src/components/features/ChangelogList.tsx` as in-app changelog source of truth.
3. Keep `README.md` and `Project.md` updated after structural or dependency changes.
4. Before handoff, always run `npm run lint` and `npm run build`.
