import Prisma from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const id = queryParams.get('id');
    if (!id) {
      return NextResponse.json(
        { message: 'Invalid query parameter' },
        { status: 400 },
      );
    }

    await Prisma.quiz.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
