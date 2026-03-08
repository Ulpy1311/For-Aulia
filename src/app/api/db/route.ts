import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

// Format: /api/db?collection=stories
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const collection = url.searchParams.get('collection');
        const db = getDbData();

        if (collection && collection in db) {
            return NextResponse.json({ success: true, data: db[collection as keyof typeof db] });
        }

        // Return all if no collection specified
        return NextResponse.json({ success: true, data: db });
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to read data' }, { status: 500 });
    }
}

// Create new item
export async function POST(req: Request) {
    try {
        const { collection, item } = await req.json();
        const db = getDbData();

        if (!collection || !(collection in db) || !item) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        const newItem = {
            id: Date.now().toString(), // Simple unique ID
            ...item
        };


        db[collection as keyof typeof db].push(newItem);

        if (saveDbData(db)) {
            return NextResponse.json({ success: true, data: newItem });
        } else {
            throw new Error('Failed to save to disk');
        }
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to save data' }, { status: 500 });
    }
}

// Update existing item
export async function PUT(req: Request) {
    try {
        const { collection, id, updates } = await req.json();
        const db = getDbData();

        if (!collection || !(collection in db) || !id || !updates) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }


        const col = db[collection as keyof typeof db] as {id: string, [key: string]: unknown}[];
        const idx = col.findIndex(item => item.id === id);

        if (idx === -1) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        col[idx] = { ...col[idx], ...updates };

        if (saveDbData(db)) {
            return NextResponse.json({ success: true, data: col[idx] });
        } else {
            throw new Error('Failed to save to disk');
        }
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to update data' }, { status: 500 });
    }
}

// Delete existing item
export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const collection = url.searchParams.get('collection');
        const id = url.searchParams.get('id');

        if (!collection || !id) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const db = getDbData();

        if (!(collection in db)) {
            return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
        }


        const col = db[collection as keyof typeof db] as {id: string, [key: string]: unknown}[];
        const filtered = col.filter(item => item.id !== id);

        if (filtered.length === col.length) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }


        db[collection as keyof typeof db] = filtered;

        if (saveDbData(db)) {
            return NextResponse.json({ success: true });
        } else {
            throw new Error('Failed to save to disk');
        }
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to delete data' }, { status: 500 });
    }
}
