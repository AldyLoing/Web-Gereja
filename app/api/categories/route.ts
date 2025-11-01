import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/categories - Get all Categorys
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.category.findMany({
        where: { deletedAt: null },
        include: { posts: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.category.count({ where: { deletedAt: null } })
    ]);

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching Categorys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Categorys' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create Category
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    
    const category = await prisma.category.create({
      data: {
        ...body,
        createdBy: session.user.id
      },
      include: { posts: true }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating Category:', error);
    return NextResponse.json(
      { error: 'Failed to create Category' },
      { status: 500 }
    );
  }
}
