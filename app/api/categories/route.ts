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
    console.log('Received body:', JSON.stringify(body, null, 2));
    
    // Validate and clean data
    const cleanData: any = {
      name: body.name,
      slug: body.slug,
      createdBy: session.user.id
    };
    
    // Optional fields
    if (body.description) cleanData.description = body.description;
    
    console.log('Clean data for Prisma:', JSON.stringify(cleanData, null, 2));
    
    const category = await prisma.category.create({
      data: cleanData,
      include: { posts: true }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('Error creating Category:', error);
    
    let errorMessage = error.message || 'Failed to create Category';
    
    if (error.message?.includes('Can\'t reach database server')) {
      errorMessage = 'Database connection error. Please check DATABASE_URL configuration.';
    } else if (error.code === 'P2002') {
      errorMessage = 'Nama atau slug kategori sudah ada.';
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
