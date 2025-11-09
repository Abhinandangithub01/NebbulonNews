import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ArticleDB } from '@/lib/db/articles';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const article = await ArticleDB.create({
      ...body,
      author: {
        name: session.user?.name || 'Admin',
        email: session.user?.email || '',
      },
    });

    return NextResponse.json({
      message: 'Article created successfully',
      article,
    });
  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json(
      { message: 'Failed to create article' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const articles = await ArticleDB.getAll();

    return NextResponse.json({
      articles,
    });
  } catch (error) {
    console.error('Fetch articles error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
