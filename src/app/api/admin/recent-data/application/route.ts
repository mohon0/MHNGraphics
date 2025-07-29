import { NextResponse } from 'next/server';
import { Prisma } from '@/components/helper/prisma/Prisma';

export async function GET() {
  try {
    // Fetch the latest 5 applications from the database
    const applications = await Prisma.application.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        studentName: true,
        image: true,
        course: true,
        createdAt: true,
      },
      take: 6,
    });

    // Return the applications as a JSON response
    return new NextResponse(JSON.stringify(applications), { status: 200 });
    // biome-ignore lint: error
  } catch (error) {
    return new NextResponse('Failed to fetch applications', { status: 500 });
  }
}
