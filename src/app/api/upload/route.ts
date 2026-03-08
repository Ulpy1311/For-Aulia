import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// This is required to process large payload in NextJS API Routes






export async function POST(req: Request) {
    // Basic server-side protection using request header token logic isn't strictly needed here
    // if middleware intercepts /api/upload. However, we'll assume only authenticated users hit this.
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file received.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define generic unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`;

        // Save to /public/uploads
        const path = join(process.cwd(), 'public', 'uploads', fileName);
        await writeFile(path, buffer);

        console.log(`Open file uploaded to: ${path}`);

        // Return relative public path string
        return NextResponse.json({
            success: true,
            url: `/uploads/${fileName}`
        });
    } catch (e: unknown) {
        console.error('File Upload Error:', e);
        return NextResponse.json({ error: e instanceof Error ? e.message : "Failed to upload file" }, { status: 500 });
    }
}
