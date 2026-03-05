import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { memorySeed, type MemoryItem } from '@/lib/story-data';

const fetchCachedMemories = unstable_cache(
    async (): Promise<MemoryItem[]> => memorySeed,
    ['story-memories'],
    {
        revalidate: 60 * 10,
        tags: ['story-memories'],
    }
);

export const getMemories = cache(async () => fetchCachedMemories());

export const getMemoriesContext = cache(async () => {
    const memories = await getMemories();
    return memories
        .map(
            (memory) =>
                `${memory.title} | ${memory.date} | ${memory.description}`
        )
        .join('\n');
});
