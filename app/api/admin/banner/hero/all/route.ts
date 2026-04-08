import { NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

export async function GET() {
  try {
    const banners = await Prisma.heroBanner.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(banners, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch hero banners' },
      { status: 500 },
    );
  }
}
