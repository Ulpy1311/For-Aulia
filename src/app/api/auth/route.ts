import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'aulia-secret-key-super-secure-2026');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'homei8099@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Raps1311';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Verify credentials
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create token (expires in 24 hours)
        const alg = 'HS256';
        const token = await new SignJWT({ email, role: 'admin' })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(JWT_SECRET);

        // Set secure HTTP-only cookie
        const response = NextResponse.json({ success: true });
        response.cookies.set({
            name: 'admin_token',
            value: token,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_token');
    return response;
}
