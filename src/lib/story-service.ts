import { getDbData } from './db';

// Get stories directly from DB JSON instead of hardcoded file
export async function getMemories() {
    const db = getDbData();
    return db.stories as {
        id: string;
        title: string;
        date: string;
        image: string;
        description: string;
        isHidden?: boolean;
    }[];
}
