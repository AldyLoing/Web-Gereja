import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Testing database counts...');

    // Test simple counts
    const memberCount = await prisma.member.count({ where: { deletedAt: null } });
    console.log('Member count:', memberCount);

    const familyCount = await prisma.family.count({ where: { deletedAt: null } });
    console.log('Family count:', familyCount);

    const baptismCount = await prisma.baptism.count({ where: { deletedAt: null } });
    console.log('Baptism count:', baptismCount);

    // Test if data exists
    const members = await prisma.member.findMany({
      where: { deletedAt: null },
      select: { id: true, fullName: true }
    });
    console.log('Members:', members);

    const families = await prisma.family.findMany({
      where: { deletedAt: null },
      select: { id: true, familyHead: true }
    });
    console.log('Families:', families);

    return NextResponse.json({
      counts: {
        members: memberCount,
        families: familyCount,
        baptisms: baptismCount
      },
      data: {
        members,
        families
      }
    });
  } catch (error: any) {
    console.error('Debug stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
