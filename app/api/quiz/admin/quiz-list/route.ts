import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import Prisma from '@/lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: 'Token not found' }, { status: 401 });
    }

    if (token.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const now = new Date();

    // 1. Automatically publish scheduled quizzes that reached their time
    await Prisma.quiz.updateMany({
      where: {
        status: 'SCHEDULED',
        scheduledFor: {
          lte: now, // Less than or equal to current time
        },
      },
      data: {
        status: 'PUBLISHED',
      },
    });

    // 2. Fetch all quizzes (including the newly published ones)
    // Added 'orderBy' so the admin sees the newest quizzes first
    const response = await Prisma.quiz.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch quiz list' },
      { status: 500 },
    );
  }
}
