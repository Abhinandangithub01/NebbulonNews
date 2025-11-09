import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ArticleDB } from '@/lib/db/articles';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const stats = await ArticleDB.getStats();
    const recentArticles = await ArticleDB.getAll({ limit: 10 });

    return NextResponse.json({
      stats,
      recentArticles,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
