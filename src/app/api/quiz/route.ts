import Prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

const ALLOWED_DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD'] as const;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Auto-publish logic (The "Just-in-Time" Sync)
    // We do this first so the 'count' and 'findMany' reflect the new state
    const now = new Date();
    await Prisma.quiz.updateMany({
      where: {
        status: 'SCHEDULED',
        scheduledFor: { lte: now },
      },
      data: {
        status: 'PUBLISHED',
      },
    });

    // Pagination params
    const page = Math.max(Number(searchParams.get('page')) || 1, 1);
    const limit = Math.min(Number(searchParams.get('limit')) || 10, 50);
    const skip = (page - 1) * limit;

    const search = searchParams.get('search')?.trim();
    const difficulty = searchParams.get('difficulty');

    // Filter logic
    // biome-ignore lint/suspicious/noExplicitAny: this is fine
    const where: any = {
      status: 'PUBLISHED',
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // biome-ignore lint/suspicious/noExplicitAny: this is fine
    if (difficulty && ALLOWED_DIFFICULTIES.includes(difficulty as any)) {
      where.difficulty = difficulty;
    }

    // Queries in parallel
    const [quizzes, total] = await Promise.all([
      Prisma.quiz.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          difficulty: true,
          image: true,
          tags: true,
          timeLimit: true,
          passingScore: true,
          createdAt: true,
        },
      }),
      Prisma.quiz.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: quizzes,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    );
  } catch (_error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
