-- ============================================
-- CHECK & FIX Admin Password
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Check if admin user exists
SELECT id, name, email, role, 
       CASE 
         WHEN password IS NULL THEN 'NO PASSWORD SET'
         WHEN length(password) < 10 THEN 'INVALID HASH'
         ELSE 'HAS PASSWORD'
       END as password_status,
       "createdAt", "updatedAt"
FROM "users" 
WHERE "email" = 'admin@gereja.com';

-- Step 2: If user exists, update password
-- Password: admin123
-- Hash: $2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC
UPDATE "users" 
SET "password" = '$2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "email" = 'admin@gereja.com';

-- Step 3: If user doesn't exist, create new admin user
-- This will only insert if email doesn't exist
INSERT INTO "users" (id, name, email, password, role, "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::TEXT,
    'Administrator',
    'admin@gereja.com',
    '$2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "users" WHERE "email" = 'admin@gereja.com'
);

-- Step 4: Verify the result
SELECT id, name, email, role, 
       substring(password, 1, 20) || '...' as password_preview,
       "createdAt", "updatedAt"
FROM "users" 
WHERE "email" = 'admin@gereja.com';
