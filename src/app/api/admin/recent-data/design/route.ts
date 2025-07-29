import { NextResponse } from 'next/server';
import { Prisma } from '@/components/helper/prisma/Prisma';

export async function GET() {
  try {
    // Fetch the latest 5 applications from the database
    const applications = await Prisma.design.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
      },
      take: 5,
    });

    // Return the applications as a JSON response
    return new NextResponse(JSON.stringify(applications), { status: 200 });
    // biome-ignore lint: error
  } catch (error) {
    return new NextResponse('Failed to fetch applications', { status: 500 });
  }
}
