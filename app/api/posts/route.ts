import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/posts - Get all Posts
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
      prisma.post.findMany({
        where: { deletedAt: null },
        include: { categories: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.post.count({ where: { deletedAt: null } })
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
    console.error('Error fetching Posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create Post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    console.log('Received body:', JSON.stringify(body, null, 2));
    
    const { categoryIds, ...postData } = body;
    
    // Validate and clean data
    const cleanData: any = {
      title: postData.title,
      slug: postData.slug,
      content: postData.content,
      isActive: postData.isActive !== undefined ? postData.isActive : true,
      createdBy: session.user.id
    };
    
    // Optional fields
    if (postData.cover) cleanData.cover = postData.cover;
    if (postData.publishedAt) cleanData.publishedAt = new Date(postData.publishedAt);
    
    // Add category relations
    if (categoryIds && categoryIds.length > 0) {
      cleanData.categories = {
        create: categoryIds.map((categoryId: string) => ({
          categoryId: categoryId
        }))
      };
    }
    
    console.log('Clean data for Prisma:', JSON.stringify(cleanData, null, 2));
    
    const post = await prisma.post.create({
      data: cleanData,
      include: { 
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Error creating Post:', error);
    
    let errorMessage = error.message || 'Failed to create Post';
    
    if (error.message?.includes('Can\'t reach database server')) {
      errorMessage = 'Database connection error. Please check DATABASE_URL configuration.';
    } else if (error.code === 'P2002') {
      errorMessage = 'Judul atau slug warta sudah ada.';
    } else if (error.code === 'P2003') {
      errorMessage = 'Kategori tidak valid.';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}
