# Supabase Configuration Guide

This document explains how to configure Supabase for your Web Gereja project.

## 📋 Prerequisites

- Supabase account (https://supabase.com)
- Database created in Supabase
- Migrations run in Supabase

## 🔧 Local Setup

### 1. Update `.env.local`

Your `.env.local` file has been configured with:

```bash
# Supabase Configuration
SUPABASE_URL="https://pcfvuqqrewqprprfqoua.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Database - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres.pcfvuqqrewqprprfqoua:YOUR_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

# NextAuth
NEXTAUTH_SECRET="generate-a-secret-key-for-production"
NEXTAUTH_URL="http://localhost:3000"
```

**⚠️ IMPORTANT:** Replace the following values:
- `YOUR_PASSWORD` - Your Supabase database password
- `your-service-role-key` - Get from Supabase Dashboard > Settings > API
- `generate-a-secret-key-for-production` - Generate with: `openssl rand -base64 32`

### 2. Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** > **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

5. Go to **Settings** > **Database**
6. Copy:
   - **Connection String** (Transaction Mode) → `DATABASE_URL`
   - Replace `[YOUR-PASSWORD]` with your database password

## 🚀 Vercel Setup

### 1. Add Environment Variables to Vercel

Go to your Vercel project dashboard:

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `SUPABASE_URL` | `https://pcfvuqqrewqprprfqoua.supabase.co` | Production, Preview, Development |
| `SUPABASE_ANON_KEY` | Your anon key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Production, Preview, Development |
| `DATABASE_URL` | `postgresql://postgres.pcfvuqqrewqprprfqoua:PASSWORD@...` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | Generated secret | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://web-imanuel.vercel.app` | Production |
| `NEXTAUTH_URL` | Your preview URL | Preview |

### 2. Redeploy

After adding environment variables:

```bash
git commit --allow-empty -m "trigger: Redeploy with Supabase env vars"
git push origin main
```

Or trigger a redeploy from Vercel dashboard.

## 🧪 Test Connection

### Local Test

```bash
npm run dev
```

Then visit: http://localhost:3000/api/test-db

### Production Test

After deployment, visit:
https://web-imanuel.vercel.app/api/test-db

Expected response:
```json
{
  "success": true,
  "message": "Database connection successful! ✅",
  "timestamp": "2025-11-02T...",
  "environment": "production",
  "database": {
    "url": "pcfvuqqrewqprprfqoua.supabase.co",
    "connected": true
  },
  "tables": {
    "members": {
      "exists": true,
      "sampleData": {...},
      "totalRecords": 0
    },
    "families": {
      "exists": true,
      "sampleData": {...},
      "totalRecords": 0
    }
  }
}
```

## 📝 Files Created

1. **`.env.local`** - Local environment variables (not in Git)
2. **`lib/supabaseClient.ts`** - Supabase client configuration
3. **`app/api/test-db/route.ts`** - Database connection test endpoint
4. **`.gitignore`** - Updated to ignore `.env.local` and `.next/`

## 🔐 Security Notes

- ✅ `.env.local` is in `.gitignore` - **NEVER** commit this file
- ✅ Use `SUPABASE_ANON_KEY` for client-side operations
- ✅ Use `SUPABASE_SERVICE_ROLE_KEY` only in server-side code (API routes)
- ✅ Enable Row Level Security (RLS) policies in Supabase for all tables

## 🗄️ Run Migrations

If you haven't run migrations yet:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Or run migrations
npx prisma migrate deploy
```

## 📊 Usage Example

### Using Supabase Client

```typescript
import { supabase } from "@/lib/supabaseClient";

// Query data
const { data, error } = await supabase
  .from("members")
  .select("*")
  .limit(10);

// Insert data
const { data, error } = await supabase
  .from("members")
  .insert({
    nik: "1234567890",
    name: "John Doe",
    // ...
  });
```

### Using Prisma (Recommended)

```typescript
import { prisma } from "@/lib/prisma";

// Query data
const members = await prisma.member.findMany({
  take: 10,
  include: { family: true }
});

// Insert data
const member = await prisma.member.create({
  data: {
    nik: "1234567890",
    name: "John Doe",
    // ...
  }
});
```

## 🆘 Troubleshooting

### Error: "Missing Supabase environment variables"

- Check if `.env.local` exists
- Verify all required variables are set
- Restart dev server: `npm run dev`

### Error: "Failed to query table"

- Check if migrations are run: `npx prisma db push`
- Verify RLS policies in Supabase dashboard
- Check if tables exist in Supabase SQL Editor

### Error: "Connection refused"

- Verify `DATABASE_URL` is correct
- Check if Supabase project is active
- Ensure password is correct

## 📚 Next Steps

1. ✅ Verify `/api/test-db` returns success
2. ⏳ Run database migrations
3. ⏳ Seed database with sample data
4. ⏳ Test Prisma queries in API routes
5. ⏳ Implement CRUD forms
6. ⏳ Add Supabase Storage for image uploads

## 🔗 Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
