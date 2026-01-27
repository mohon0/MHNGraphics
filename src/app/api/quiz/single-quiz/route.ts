import Prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('id');

    if (!slug) {
      return new Response('Bad Request: Missing slug parameter', {
        status: 400,
      });
    }
    const response = await Prisma.quiz.findUnique({
      where: {
        id: slug,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (_error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
