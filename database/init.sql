-- ============================================
-- Web Gereja Database Schema
-- Auto-generated from Prisma Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'JEMAAT');
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'JEMAAT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "accounts_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")
);

CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "sessionToken" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "verification_tokens_identifier_token_key" UNIQUE ("identifier", "token")
);

-- ============================================
-- FAMILIES
-- ============================================

CREATE TABLE "families" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "headOfFamily" TEXT NOT NULL,
    "address" TEXT,
    "totalMember" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedBy" TEXT
);

-- ============================================
-- CHURCH GROUPS
-- ============================================

CREATE TABLE "church_groups" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedBy" TEXT
);

-- ============================================
-- MEMBERS
-- ============================================

CREATE TABLE "members" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "userId" TEXT UNIQUE,
    "familyId" TEXT,
    "nik" TEXT NOT NULL UNIQUE,
    "kk" TEXT,
    "fullName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthPlace" TEXT,
    "birthDate" TIMESTAMP(3),
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "maritalStatus" "MaritalStatus" NOT NULL DEFAULT 'SINGLE',
    "hasBaptism" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedBy" TEXT,
    CONSTRAINT "members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "members_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- ============================================
-- MEMBER - CHURCH GROUP (PIVOT)
-- ============================================

CREATE TABLE "member_church_group" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "memberId" TEXT NOT NULL,
    "churchGroupId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "member_church_group_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "member_church_group_churchGroupId_fkey" FOREIGN KEY ("churchGroupId") REFERENCES "church_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "member_church_group_memberId_churchGroupId_key" UNIQUE ("memberId", "churchGroupId")
);

-- ============================================
-- BAPTISMS
-- ============================================

CREATE TABLE "baptisms" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "memberId" TEXT NOT NULL UNIQUE,
    "baptismDate" TIMESTAMP(3) NOT NULL,
    "minister" TEXT,
    "certificate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedBy" TEXT,
    CONSTRAINT "baptisms_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================
-- CATEGORIES
-- ============================================

CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL UNIQUE,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedBy" TEXT
);

-- ============================================
-- POSTS
-- ============================================

CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "content" TEXT NOT NULL,
    "cover" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedBy" TEXT
);

-- ============================================
-- POST - CATEGORY (PIVOT)
-- ============================================

CREATE TABLE "post_category" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "post_category_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "post_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "post_category_postId_categoryId_key" UNIQUE ("postId", "categoryId")
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");
CREATE INDEX "members_userId_idx" ON "members"("userId");
CREATE INDEX "members_familyId_idx" ON "members"("familyId");
CREATE INDEX "member_church_group_memberId_idx" ON "member_church_group"("memberId");
CREATE INDEX "member_church_group_churchGroupId_idx" ON "member_church_group"("churchGroupId");
CREATE INDEX "baptisms_memberId_idx" ON "baptisms"("memberId");
CREATE INDEX "post_category_postId_idx" ON "post_category"("postId");
CREATE INDEX "post_category_categoryId_idx" ON "post_category"("categoryId");

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "accounts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "verification_tokens" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "families" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "church_groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "members" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "member_church_group" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "baptisms" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "post_category" ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow service_role to bypass RLS
CREATE POLICY "Allow service role all access on users" ON "users" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on accounts" ON "accounts" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on sessions" ON "sessions" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on verification_tokens" ON "verification_tokens" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on families" ON "families" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on church_groups" ON "church_groups" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on members" ON "members" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on member_church_group" ON "member_church_group" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on baptisms" ON "baptisms" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on categories" ON "categories" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on posts" ON "posts" FOR ALL USING (true);
CREATE POLICY "Allow service role all access on post_category" ON "post_category" FOR ALL USING (true);

-- ============================================
-- SEED DATA: Default Admin User
-- ============================================

-- Password: admin123 (bcrypt hash)
INSERT INTO "users" ("id", "name", "email", "password", "role", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::TEXT,
    'Administrator',
    'admin@gereja.com',
    '$2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- ============================================
-- SEED DATA: Church Groups
-- ============================================

INSERT INTO "church_groups" ("id", "name", "description", "createdAt", "updatedAt")
VALUES
    (gen_random_uuid()::TEXT, 'PELNAP', 'Pelayanan Anak dan Pemuda', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid()::TEXT, 'PELRAP', 'Pelayanan Remaja dan Pemuda', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid()::TEXT, 'PELWAP', 'Pelayanan Wanita dan Pemuda', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid()::TEXT, 'PELPRIP', 'Pelayanan Pria dan Pemuda', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid()::TEXT, 'PELPAP', 'Pelayanan Lansia dan Pemuda', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- COMPLETE! ✅
-- ============================================
-- Run this script in Supabase SQL Editor
-- https://supabase.com/dashboard/project/pcfvuqqrewqprprfqoua/sql/new
