/**
 * 🔐 AUTHENTICATION GENERATOR
 * Auto-generates NextAuth.js setup with Supabase adapter
 */

import * as fs from 'fs';
import * as path from 'path';

export async function generateAuthSetup(projectRoot: string) {
  const libDir = path.join(projectRoot, 'lib');
  fs.mkdirSync(libDir, { recursive: true });

  // Generate auth config
  fs.writeFileSync(path.join(libDir, 'auth.ts'), generateAuthConfig());

  // Generate middleware
  fs.writeFileSync(path.join(projectRoot, 'middleware.ts'), generateMiddleware());

  // Generate auth API route
  const authApiDir = path.join(projectRoot, 'app', 'api', 'auth', '[...nextauth]');
  fs.mkdirSync(authApiDir, { recursive: true });
  fs.writeFileSync(path.join(authApiDir, 'route.ts'), generateAuthApiRoute());
}

function generateAuthConfig(): string {
  return `import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan password harus diisi');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error('Email atau password salah');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Email atau password salah');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image
        };
      }
    })
  ],

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: '/login',
    error: '/login'
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET
};
`;
}

function generateMiddleware(): string {
  return `import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isMemberRoute = req.nextUrl.pathname.startsWith('/member');

    // Protect admin routes
    if (isAdminRoute && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Protect member routes
    if (isMemberRoute && !token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: ['/admin/:path*', '/member/:path*']
};
`;
}

function generateAuthApiRoute(): string {
  return `import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
`;
}
