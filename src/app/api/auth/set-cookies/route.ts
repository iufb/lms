import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { role } = await req.json();


    (await cookies()).set('role', role, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ message: 'Cookies set' });
}
