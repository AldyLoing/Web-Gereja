import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

/**
 * Debug Login Endpoint
 * Test: https://web-imanuel.vercel.app/api/debug-login
 */
export async function GET() {
  try {
    // 1. Cek apakah user admin ada
    const user = await prisma.user.findUnique({
      where: { email: "admin@gereja.com" },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User admin@gereja.com NOT FOUND in database",
        hint: "Run the INSERT SQL query in Supabase",
      });
    }

    // 2. Cek password hash
    const passwordInfo = {
      exists: !!user.password,
      length: user.password?.length || 0,
      startsWithCorrectPrefix: user.password?.startsWith("$2b$10$") || false,
      preview: user.password?.substring(0, 30) + "...",
    };

    // 3. Test bcrypt compare dengan password 'admin123'
    let bcryptTest = null;
    if (user.password) {
      try {
        const isMatch = await bcrypt.compare("admin123", user.password);
        bcryptTest = {
          testPassword: "admin123",
          matches: isMatch,
        };
      } catch (err: any) {
        bcryptTest = {
          error: err.message,
        };
      }
    }

    return NextResponse.json({
      success: true,
      message: "Debug info retrieved",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      passwordInfo,
      bcryptTest,
      recommendation:
        bcryptTest?.matches === false
          ? "❌ Password hash is WRONG! Run UPDATE SQL to fix it."
          : bcryptTest?.matches === true
          ? "✅ Password hash is CORRECT! Problem might be in NextAuth config."
          : "⚠️ Unable to test password",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to debug login",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
