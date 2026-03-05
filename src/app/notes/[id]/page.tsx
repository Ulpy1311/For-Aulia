import { notes } from '@/lib/notes';
import { notFound } from 'next/navigation';
import NoteDetailClient from './NoteDetailClient';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const note = notes.find((n) => n.id === resolvedParams.id);

    if (!note) {
        return { title: 'Note Not Found' };
    }

    return {
        title: `Note ${note.id.padStart(2, '0')} - For Aulia`,
        description: note.content.EN.title,
    };
}

export function generateStaticParams() {
    return notes.map((note) => ({
        id: note.id,
    }));
}

export default async function NotePage({ params }: Props) {
    const resolvedParams = await params;
    const note = notes.find((n) => n.id === resolvedParams.id);

    if (!note) {
        notFound();
    }

    return <NoteDetailClient note={note} />;
}
