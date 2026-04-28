import { NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

export async function GET() {
  try {
    const response = await Prisma.heroBanner.findMany({
      where: {
        isActive: true,
      },
    });
    return NextResponse.json(response);
  } catch (_error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching hero data.' },
      { status: 500 },
    );
  }
}
