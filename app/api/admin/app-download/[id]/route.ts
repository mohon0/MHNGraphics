import { type NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { validateCsrf } from '@/lib/csrf';
import Prisma from '@/lib/prisma';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAuth(req, ['ADMIN']);
  if (authError) return authError;

  const csrfError = validateCsrf(req);
  if (csrfError) return csrfError;

  try {
    const { id } = await params;

    await Prisma.appRelease.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'App release deleted successfully ✅',
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to delete app release' },
      { status: 500 },
    );
  }
}
