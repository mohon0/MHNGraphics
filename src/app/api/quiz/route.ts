import { NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

const ALLOWED_DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD'] as const;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Pagination params
    const page = Math.max(Number(searchParams.get('page')) || 1, 1);
    const limit = Math.min(Number(searchParams.get('limit')) || 10, 50);
    const skip = (page - 1) * limit;

    // Filters
    const search = searchParams.get('search')?.trim();
    const difficulty = searchParams.get('difficulty');

    // biome-ignore lint/suspicious/noExplicitAny: this is fine
    const where: any = {
      status: 'PUBLISHED',
    };

    // Search logic
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // Difficulty filter (validated)
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
        orderBy: {
          createdAt: 'desc',
        },
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
