import fs from 'fs';
import path from 'path';

// Define the absolute path for local storage
const DB_PATH = path.join(process.cwd(), 'src', 'lib', 'db', 'data.json');

// Interface structures
export interface DataStore {
    stories: unknown[];
    galleries: unknown[];
    notes: unknown[];
    changelogs: unknown[];
}

// Initial dummy state mapping to your existing static files (simulated for now)
const DEFAULT_DATA: DataStore = {
    stories: [],
    galleries: [],
    notes: [],
    changelogs: []
};

// Lazy init the db
export function getDbData(): DataStore {
    try {
        if (!fs.existsSync(DB_PATH)) {
            // Write default data
            fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
            fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DATA, null, 2));
            return DEFAULT_DATA;
        }
        const fileData = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(fileData) as DataStore;
    } catch (e) {
        console.error("DB Read Error:", e);
        return DEFAULT_DATA;
    }
}

export function saveDbData(data: DataStore): boolean {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        return true;
    } catch (e) {
        console.error("DB Write Error:", e);
        return false;
    }
}
