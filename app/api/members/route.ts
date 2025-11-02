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
        include: { 
          family: true, 
          churchGroups: {
            include: {
              churchGroup: true
            }
          }, 
          baptism: true 
        },
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
    console.log('Received body:', JSON.stringify(body, null, 2));
    
    const { churchGroupIds, ...memberData } = body;
    
    // Validate and clean data
    const cleanData: any = {
      nik: memberData.nik,
      fullName: memberData.fullName,
      gender: memberData.gender,
      maritalStatus: memberData.maritalStatus || 'SINGLE',
      createdBy: session.user.id
    };
    
    // Optional fields
    if (memberData.kk) cleanData.kk = memberData.kk;
    if (memberData.birthPlace) cleanData.birthPlace = memberData.birthPlace;
    if (memberData.birthDate) cleanData.birthDate = new Date(memberData.birthDate);
    if (memberData.phone) cleanData.phone = memberData.phone;
    if (memberData.email) cleanData.email = memberData.email;
    if (memberData.address) cleanData.address = memberData.address;
    if (memberData.familyId) cleanData.familyId = memberData.familyId;
    
    // Add church group relations
    if (churchGroupIds && churchGroupIds.length > 0) {
      cleanData.churchGroups = {
        create: churchGroupIds.map((groupId: string) => ({
          churchGroupId: groupId
        }))
      };
    }
    
    console.log('Clean data for Prisma:', JSON.stringify(cleanData, null, 2));
    
    // Create member with church group relations
    const member = await prisma.member.create({
      data: cleanData,
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
    
    // Better error message for database connection issues
    let errorMessage = error.message || 'Failed to create Member';
    
    if (error.message?.includes('Can\'t reach database server')) {
      errorMessage = 'Database connection error. Please check DATABASE_URL configuration.';
    } else if (error.code === 'P2002') {
      errorMessage = 'NIK sudah terdaftar. Silakan gunakan NIK yang berbeda.';
    } else if (error.code === 'P2003') {
      errorMessage = 'Data keluarga atau kelompok sel tidak valid.';
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
