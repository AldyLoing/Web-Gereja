import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test 1: Database Connection
    const startTime = Date.now();
    await prisma.$connect();
    const connectTime = Date.now() - startTime;

    // Test 2: Simple Query
    const queryStartTime = Date.now();
    const userCount = await prisma.user.count();
    const queryTime = Date.now() - queryStartTime;

    // Test 3: Get First User
    const firstUser = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    // Test 4: Database URL check
    const dbUrl = (process.env as any).DATABASE_URL || 'NOT SET';
    const dbUrlPreview = dbUrl
      .replace(/:[^:@]+@/, ':****@') // Hide password
      .substring(0, 100);

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      tests: {
        connection: {
          status: 'OK',
          time: `${connectTime}ms`
        },
        query: {
          status: 'OK',
          time: `${queryTime}ms`,
          userCount
        },
        firstUser: firstUser ? {
          id: firstUser.id,
          email: firstUser.email,
          role: firstUser.role,
          createdAt: firstUser.createdAt
        } : null
      },
      environment: {
        databaseUrl: dbUrlPreview,
        nodeEnv: process.env.NODE_ENV,
        vercel: (process.env as any).VERCEL ? 'true' : 'false',
        vercelEnv: (process.env as any).VERCEL_ENV || 'not-vercel'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        code: error.code,
        meta: error.meta
      },
      environment: {
        databaseUrl: (process.env as any).DATABASE_URL 
          ? (process.env as any).DATABASE_URL.replace(/:[^:@]+@/, ':****@').substring(0, 100)
          : 'NOT SET',
        nodeEnv: process.env.NODE_ENV,
        vercel: (process.env as any).VERCEL ? 'true' : 'false',
        vercelEnv: (process.env as any).VERCEL_ENV || 'not-vercel'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
