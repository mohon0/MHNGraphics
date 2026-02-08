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

    // Fetch ALL results for proper ranking calculation
    const allResults = await Prisma.quizResult.findMany({
      where: { quizId },
      select: {
        id: true,
        userId: true,
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
            image: true,
          },
        },
      },
      // Sort by score DESC, then by timeSpent ASC (faster time = better rank)
      orderBy: [{ score: 'desc' }, { timeSpent: 'asc' }],
    });

    // Calculate rankings
    const rankedResults = allResults.map((result, index, array) => {
      let rank = index + 1;

      // Handle ties: if previous result has same score and time, use same rank
      if (index > 0) {
        const prev = array[index - 1];
        if (
          prev.score === result.score &&
          prev.timeSpent === result.timeSpent
        ) {
          // Find the rank of the first person in this tie group
          let tieGroupIndex = index - 1;
          while (
            tieGroupIndex > 0 &&
            array[tieGroupIndex - 1].score === result.score &&
            array[tieGroupIndex - 1].timeSpent === result.timeSpent
          ) {
            tieGroupIndex--;
          }
          rank = tieGroupIndex + 1;
        }
      }

      return {
        ...result,
        rank,
      };
    });

    // Apply filtering if userId is specified
    const filteredResults = userId
      ? rankedResults.filter((r) => r.userId === userId)
      : rankedResults;

    // Apply pagination
    const paginatedResults = filteredResults.slice(offset, offset + limit);

    const totalCount = filteredResults.length;

    // Calculate stats only if there are results
    const stats =
      filteredResults.length > 0
        ? {
            averageScore:
              Math.round(
                (filteredResults.reduce((sum, r) => sum + r.score, 0) /
                  filteredResults.length) *
                  10,
              ) / 10,
            highestScore: Math.max(...filteredResults.map((r) => r.score)),
            passRate: Math.round(
              (filteredResults.filter((r) => r.passed).length /
                filteredResults.length) *
                100,
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
        results: paginatedResults.map(({ user, rank, ...result }) => ({
          ...result,
          rank,
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
