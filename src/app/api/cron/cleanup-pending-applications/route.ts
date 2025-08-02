import { type NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/components/helper/prisma/Prisma';
import cloudinary from '@/utils/cloudinary';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const oldPendingApplications = await Prisma.pendingApplication.findMany({
      where: {
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    });

    let deletedCount = 0;

    for (const pending of oldPendingApplications) {
      if (pending.imageId) {
        try {
          await cloudinary.uploader.destroy(pending.imageId);
        } catch (error) {
          // biome-ignore lint: error
          console.error(
            `Failed to delete image from Cloudinary: ${pending.imageId}`,
            error,
          );
        }
      }
      await Prisma.pendingApplication.delete({ where: { id: pending.id } });
      deletedCount++;
    }

    return NextResponse.json({
      message: `Successfully cleaned up ${deletedCount} old pending applications.`,
    });
    // biome-ignore lint: error
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
