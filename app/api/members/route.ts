import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/members - Get all Members
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
      prisma.member.findMany({
        where: { deletedAt: null },
        include: { family: true, churchGroups: true, baptism: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.member.count({ where: { deletedAt: null } })
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
    console.error('Error fetching Members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Members' },
      { status: 500 }
    );
  }
}

// POST /api/members - Create Member
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { churchGroupIds, ...memberData } = body;
    
    // Create member with church group relations
    const member = await prisma.member.create({
      data: {
        ...memberData,
        createdBy: session.user.id,
        // Create church group relations if provided
        churchGroups: churchGroupIds && churchGroupIds.length > 0 ? {
          create: churchGroupIds.map((groupId: string) => ({
            churchGroupId: groupId
          }))
        } : undefined
      },
      include: { 
        family: true, 
        churchGroups: {
          include: {
            churchGroup: true
          }
        }, 
        baptism: true 
      }
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    console.error('Error creating Member:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create Member' },
      { status: 500 }
    );
  }
}
