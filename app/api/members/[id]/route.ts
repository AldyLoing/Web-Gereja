import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/members/[id] - Get single Member
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
    const member = await prisma.member.findUnique({
      where: { id },
      include: { family: true, churchGroups: true, baptism: true }
    });

    if (!member || member.deletedAt) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error('Error fetching Member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Member' },
      { status: 500 }
    );
  }
}

// PUT /api/members/[id] - Update Member
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
    
    const member = await prisma.member.update({
      where: { id },
      data: {
        ...body,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      include: { family: true, churchGroups: true, baptism: true }
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error('Error updating Member:', error);
    return NextResponse.json(
      { error: 'Failed to update Member' },
      { status: 500 }
    );
  }
}

// DELETE /api/members/[id] - Soft delete Member
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
    await prisma.member.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id
      }
    });

    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting Member:', error);
    return NextResponse.json(
      { error: 'Failed to delete Member' },
      { status: 500 }
    );
  }
}
