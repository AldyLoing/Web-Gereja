import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/church-groups/[id] - Get single ChurchGroup
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const churchgroup = await prisma.churchgroup.findUnique({
      where: { id: params.id, deletedAt: null },
      include: { members: true }
    });

    if (!churchgroup) {
      return NextResponse.json({ error: 'ChurchGroup not found' }, { status: 404 });
    }

    return NextResponse.json(churchgroup);
  } catch (error) {
    console.error('Error fetching ChurchGroup:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ChurchGroup' },
      { status: 500 }
    );
  }
}

// PUT /api/church-groups/[id] - Update ChurchGroup
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    
    const churchgroup = await prisma.churchgroup.update({
      where: { id: params.id, deletedAt: null },
      data: {
        ...body,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      include: { members: true }
    });

    return NextResponse.json(churchgroup);
  } catch (error) {
    console.error('Error updating ChurchGroup:', error);
    return NextResponse.json(
      { error: 'Failed to update ChurchGroup' },
      { status: 500 }
    );
  }
}

// DELETE /api/church-groups/[id] - Soft delete ChurchGroup
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await prisma.churchgroup.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id
      }
    });

    return NextResponse.json({ message: 'ChurchGroup deleted successfully' });
  } catch (error) {
    console.error('Error deleting ChurchGroup:', error);
    return NextResponse.json(
      { error: 'Failed to delete ChurchGroup' },
      { status: 500 }
    );
  }
}
