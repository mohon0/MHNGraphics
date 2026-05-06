import { type NextRequest, NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

const ALLOWED_ORIGINS = [
  'https://www.training.oylkka.com',
  'https://training.oylkka.com',
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin', // important when allowing multiple origins
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get('origin')),
  });
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');

  try {
    const banners = await Prisma.heroBanner.findMany({
      where: { isActive: true },
    });

    return new NextResponse(JSON.stringify(banners), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(origin),
      },
    });
  } catch (_error) {
    return new NextResponse(
      JSON.stringify({ error: 'An error occurred while fetching hero data.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin),
        },
      },
    );
  }
}
