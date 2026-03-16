import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { checkBalance } from '@/lib/sms';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse('User not logged in', { status: 401 });
    }
    if (token.role !== 'ADMIN') {
      return new NextResponse('Unauthorized access', { status: 403 });
    }
    const data = await checkBalance();
    return NextResponse.json({ success: true, data });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 },
    );
  }
}
