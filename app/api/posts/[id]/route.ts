import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/posts/[id] - Get single Post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id, deletedAt: null },
      include: { categories: true }
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching Post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Post' },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[id] - Update Post
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
    
    const post = await prisma.post.update({
      where: { id: params.id, deletedAt: null },
      data: {
        ...body,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      include: { categories: true }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating Post:', error);
    return NextResponse.json(
      { error: 'Failed to update Post' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Soft delete Post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await prisma.post.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id
      }
    });

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting Post:', error);
    return NextResponse.json(
      { error: 'Failed to delete Post' },
      { status: 500 }
    );
  }
}
