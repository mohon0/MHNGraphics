import { NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

export async function GET() {
  try {
    const releases = await Prisma.appRelease.findMany({
      where: { isActive: true },
      orderBy: { platform: 'asc' },
      select: {
        id: true,
        platform: true,
        downloadUrl: true,
        version: true,
        isActive: true,
      },
    });

    return NextResponse.json(releases);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch app releases' },
      { status: 500 },
    );
  }
}
