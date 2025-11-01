import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/church-groups - Get all ChurchGroups
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
      prisma.churchgroup.findMany({
        where: { deletedAt: null },
        include: { members: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.churchgroup.count({ where: { deletedAt: null } })
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
    console.error('Error fetching ChurchGroups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ChurchGroups' },
      { status: 500 }
    );
  }
}

// POST /api/church-groups - Create ChurchGroup
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    
    const churchgroup = await prisma.churchgroup.create({
      data: {
        ...body,
        createdBy: session.user.id
      },
      include: { members: true }
    });

    return NextResponse.json(churchgroup, { status: 201 });
  } catch (error) {
    console.error('Error creating ChurchGroup:', error);
    return NextResponse.json(
      { error: 'Failed to create ChurchGroup' },
      { status: 500 }
    );
  }
}
