import { type NextRequest, NextResponse } from 'next/server';
import Prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get('id');
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!quizId) {
      return NextResponse.json(
        { message: 'Quiz ID is required' },
        { status: 400 },
      );
    }

    // biome-ignore lint/suspicious/noExplicitAny: this is fine
    const whereClause: any = { quizId };
    if (userId) whereClause.userId = userId;

    // Get quiz info once (not repeated for every result)
    const quiz = await Prisma.quiz.findUnique({
      where: { id: quizId },
      select: {
        id: true,
        title: true,
        difficulty: true,
        passingScore: true,
        timeLimit: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
    }

    const results = await Prisma.quizResult.findMany({
      where: whereClause,
      select: {
        id: true,
        userId: true,
        score: true,
        totalQuestions: true,
        timeSpent: true,
        passed: true,
        attemptNumber: true,
        completedAt: true,
        // Only include answers if specifically requested
        answers: searchParams.get('includeAnswers') === 'true',
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: [{ score: 'desc' }, { completedAt: 'desc' }],
      take: limit,
      skip: offset,
    });

    const totalCount = await Prisma.quizResult.count({
      where: whereClause,
    });

    // Calculate stats only if there are results
    const stats =
      results.length > 0
        ? {
            averageScore:
              Math.round(
                (results.reduce((sum, r) => sum + r.score, 0) /
                  results.length) *
                  10,
              ) / 10,
            highestScore: Math.max(...results.map((r) => r.score)),
            passRate: Math.round(
              (results.filter((r) => r.passed).length / results.length) * 100,
            ),
            totalAttempts: totalCount,
          }
        : null;

    return NextResponse.json(
      {
        quiz: {
          id: quiz.id,
          title: quiz.title,
          difficulty: quiz.difficulty,
          passingScore: quiz.passingScore,
          timeLimit: quiz.timeLimit,
          questionCount: quiz._count.questions,
        },
        results: results.map(({ user, ...result }) => ({
          ...result,
          userName: user.name,
          userImage: user.image,
          percentage: Math.round((result.score / result.totalQuestions) * 100),
        })),
        stats,
        pagination: {
          total: totalCount,
          page: Math.floor(offset / limit) + 1,
          pageSize: limit,
          hasMore: offset + limit < totalCount,
        },
      },
      { status: 200 },
    );
  } catch (_error) {
    return NextResponse.json(
      { message: 'Failed to fetch quiz results' },
      { status: 500 },
    );
  }
}
