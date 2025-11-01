import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/baptisms/[id] - Get single Baptism
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const baptism = await prisma.baptism.findUnique({
      where: { id: params.id, deletedAt: null },
      include: { member: true }
    });

    if (!baptism) {
      return NextResponse.json({ error: 'Baptism not found' }, { status: 404 });
    }

    return NextResponse.json(baptism);
  } catch (error) {
    console.error('Error fetching Baptism:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Baptism' },
      { status: 500 }
    );
  }
}

// PUT /api/baptisms/[id] - Update Baptism
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
    
    const baptism = await prisma.baptism.update({
      where: { id: params.id, deletedAt: null },
      data: {
        ...body,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      include: { member: true }
    });

    return NextResponse.json(baptism);
  } catch (error) {
    console.error('Error updating Baptism:', error);
    return NextResponse.json(
      { error: 'Failed to update Baptism' },
      { status: 500 }
    );
  }
}

// DELETE /api/baptisms/[id] - Soft delete Baptism
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await prisma.baptism.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id
      }
    });

    return NextResponse.json({ message: 'Baptism deleted successfully' });
  } catch (error) {
    console.error('Error deleting Baptism:', error);
    return NextResponse.json(
      { error: 'Failed to delete Baptism' },
      { status: 500 }
    );
  }
}
