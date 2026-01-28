import Prisma from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('id');

    if (!slug) {
      return NextResponse.json('Bad Request: Missing slug parameter', {
        status: 400,
      });
    }

    const quiz = await Prisma.quizResult.findUnique({
      where: { id: slug },
      select: {
        id: true,
        score: true,
        totalQuestions: true,
        timeSpent: true,
        passed: true,
        attemptNumber: true,
        completedAt: true,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            image: true,
          },
        },
        quiz: {
          select: {
            id: true,
            title: true,
            description: true,
            timeLimit: true,
            passingScore: true,
          },
        },
      },
    });
    return NextResponse.json(quiz, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch quiz result' },
      { status: 500 },
    );
  }
}
