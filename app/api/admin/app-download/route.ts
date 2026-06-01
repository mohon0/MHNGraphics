import { type NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { validateCsrf } from '@/lib/csrf';
import Prisma from '@/lib/prisma';
import { AppReleaseUpsertSchema } from '@/lib/Schemas';

export async function GET(req: NextRequest) {
  const authError = await requireAuth(req, ['ADMIN']);
  if (authError) return authError;

  try {
    const releases = await Prisma.appRelease.findMany({
      orderBy: { platform: 'asc' },
    });
    return NextResponse.json(releases);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch app releases' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth(req, ['ADMIN']);
  if (authError) return authError;

  const csrfError = validateCsrf(req);
  if (csrfError) return csrfError;

  try {
    const body = await req.json();

    const validationResult = AppReleaseUpsertSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { platform, downloadUrl, version, isActive } = validationResult.data;

    const release = await Prisma.appRelease.upsert({
      where: { platform },
      update: { downloadUrl, version, isActive },
      create: { platform, downloadUrl, version, isActive },
    });

    return NextResponse.json(release, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to upsert app release' },
      { status: 500 },
    );
  }
}
