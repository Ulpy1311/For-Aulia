import { NotesClient } from './NotesClient';
import { getDbData } from '@/lib/db';

export default function NotesPage() {
    // Ambil data langsung dari local DB kita di server component
    const db = getDbData();

    const initialData = db.notes as {id: string, title: string, content: string | {EN: string, ID: string}, date: string, isArchived: boolean, isHidden: boolean}[];

    return <NotesClient initialData={initialData} />;
}
