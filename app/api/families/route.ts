import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/families - Get all Familys
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
      prisma.family.findMany({
        where: { deletedAt: null },
        include: { members: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.family.count({ where: { deletedAt: null } })
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
    console.error('Error fetching Familys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Familys' },
      { status: 500 }
    );
  }
}

// POST /api/families - Create Family
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
      familyHead: body.familyHead,
      createdBy: session.user.id
    };
    
    // Optional fields
    if (body.address) cleanData.address = body.address;
    
    console.log('Clean data for Prisma:', JSON.stringify(cleanData, null, 2));
    
    const family = await prisma.family.create({
      data: cleanData,
      include: { members: true }
    });

    return NextResponse.json(family, { status: 201 });
  } catch (error: any) {
    console.error('Error creating Family:', error);
    
    let errorMessage = error.message || 'Failed to create Family';
    
    if (error.message?.includes('Can\'t reach database server')) {
      errorMessage = 'Database connection error. Please check DATABASE_URL configuration.';
    } else if (error.code === 'P2002') {
      errorMessage = 'Data keluarga sudah ada.';
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
