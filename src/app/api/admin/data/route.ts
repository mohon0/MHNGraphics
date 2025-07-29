import { NextResponse } from 'next/server';
import { Prisma } from '@/components/helper/prisma/Prisma';

export async function GET() {
  try {
    // Fetch counts from the database
    const designCount = await Prisma.design.count();
    const subscriberCount = await Prisma.subscriber.count();
    const commentsCount = await Prisma.comment.count();
    const userCount = await Prisma.user.count();
    const applicationCount = await Prisma.application.count();

    const data = {
      designCount,
      subscriberCount,
      commentsCount,
      userCount,
      applicationCount,
    };

    // Return counts as JSON response
    return new NextResponse(JSON.stringify(data));
    // biome-ignore lint: error
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
