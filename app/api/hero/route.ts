import { type NextRequest, NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

const ALLOWED_ORIGINS = ['https://www.training.oylkka.com'];

function corsHeaders(origin: string | null): Record<string, string> | null {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
  }
  return null;
}

export async function OPTIONS(req: NextRequest) {
  const headers = corsHeaders(req.headers.get('origin'));
  // status 204: No Content is standard for OPTIONS
  return new NextResponse(null, {
    status: 204,
    headers: headers || undefined,
  });
}

export async function GET(req: NextRequest) {
  try {
    const banners = await Prisma.heroBanner.findMany({
      where: {
        isActive: true,
      },
    });

    return new NextResponse(JSON.stringify(banners), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...(corsHeaders(req.headers.get('origin')) ?? {}),
      },
    });
  } catch (_error) {
    return new NextResponse(
      JSON.stringify({ error: 'An error occurred while fetching hero data.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...(corsHeaders(req.headers.get('origin')) ?? {}),
        },
      },
    );
  }
}
