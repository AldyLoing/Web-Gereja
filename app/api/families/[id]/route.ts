import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/families/[id] - Get single Family
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const family = await prisma.family.findUnique({
      where: { id },
      include: { members: true }
    });

    if (!family || family.deletedAt) {
      return NextResponse.json({ error: 'Family not found' }, { status: 404 });
    }

    return NextResponse.json(family);
  } catch (error) {
    console.error('Error fetching Family:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Family' },
      { status: 500 }
    );
  }
}

// PUT /api/families/[id] - Update Family
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    
    const family = await prisma.family.update({
      where: { id },
      data: {
        ...body,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      include: { members: true }
    });

    return NextResponse.json(family);
  } catch (error) {
    console.error('Error updating Family:', error);
    return NextResponse.json(
      { error: 'Failed to update Family' },
      { status: 500 }
    );
  }
}

// DELETE /api/families/[id] - Soft delete Family
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    await prisma.family.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id
      }
    });

    return NextResponse.json({ message: 'Family deleted successfully' });
  } catch (error) {
    console.error('Error deleting Family:', error);
    return NextResponse.json(
      { error: 'Failed to delete Family' },
      { status: 500 }
    );
  }
}
