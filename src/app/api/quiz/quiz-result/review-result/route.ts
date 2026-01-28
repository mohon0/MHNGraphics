import Prisma from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 },
      );
    }

    const result = await Prisma.quizResult.findUnique({
      where: { id },
      select: {
        // Exclude quizId and userId by simply not including them here
        id: true,
        score: true,
        totalQuestions: true,
        answers: true, // This contains your JSON: e.g., { "questionId": "optionId" }
        timeSpent: true,
        passed: true,
        completedAt: true,
        // Include related user info
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        // Include the Quiz structure for comparison
        quiz: {
          select: {
            title: true,
            questions: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                text: true,
                image: true,
                options: {
                  select: {
                    id: true,
                    text: true,
                    isCorrect: true, // Critical for review
                    explanation: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch review result' },
      { status: 500 },
    );
  }
}
