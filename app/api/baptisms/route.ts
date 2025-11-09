import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/baptisms - Get all Baptisms
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

    console.log('Fetching baptisms - page:', page, 'limit:', limit);

    let data: any[] = [];
    let total = 0;
    
    try {
      total = await prisma.baptism.count({ where: { deletedAt: null } });
      console.log('Total baptisms:', total);
    } catch (countError: any) {
      console.error('Error counting baptisms:', countError);
      return NextResponse.json({ error: `Count error: ${countError.message}` }, { status: 500 });
    }

    try {
      data = await prisma.baptism.findMany({
        where: { deletedAt: null },
        select: {
          id: true,
          baptismDate: true,
          baptismPlace: true,
          minister: true,
          certificate: true,
          createdAt: true,
          updatedAt: true,
          member: {
            select: {
              id: true,
              fullName: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
      console.log('Baptisms fetched:', data.length);
    } catch (fetchError: any) {
      console.error('Error fetching baptisms:', fetchError);
      return NextResponse.json({ error: `Fetch error: ${fetchError.message}` }, { status: 500 });
    }

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error in baptisms API:', error);
    return NextResponse.json(
      { error: `Failed to fetch Baptisms: ${error.message}` },
      { status: 500 }
    );
  }
}

// POST /api/baptisms - Create Baptism
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
      memberId: body.memberId,
      baptismDate: new Date(body.baptismDate),
      minister: body.minister,
      createdBy: session.user.id
    };
    
    // Optional fields
    if (body.baptismPlace) cleanData.baptismPlace = body.baptismPlace;
    if (body.certificate) cleanData.certificate = body.certificate;
    
    console.log('Clean data for Prisma:', JSON.stringify(cleanData, null, 2));
    
    const baptism = await prisma.baptism.create({
      data: cleanData,
      include: { member: true }
    });

    return NextResponse.json(baptism, { status: 201 });
  } catch (error: any) {
    console.error('Error creating Baptism:', error);
    
    let errorMessage = error.message || 'Failed to create Baptism';
    
    if (error.message?.includes('Can\'t reach database server')) {
      errorMessage = 'Database connection error. Please check DATABASE_URL configuration.';
    } else if (error.code === 'P2002') {
      errorMessage = 'Jemaat ini sudah memiliki data baptisan.';
    } else if (error.code === 'P2003') {
      errorMessage = 'Jemaat tidak ditemukan.';
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
