-- ============================================
-- Update Admin Password
-- Run this in Supabase SQL Editor to fix login issue
-- Password: admin123
-- ============================================

UPDATE "users" 
SET "password" = '$2b$10$saSx9.mS3Q4fKbeLJYJIRe56zmZ.oX21jAtzvb3WliaQ8BDqAFFIC',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "email" = 'admin@gereja.com';

-- Verify the update
SELECT id, name, email, role, "createdAt", "updatedAt" 
FROM "users" 
WHERE "email" = 'admin@gereja.com';
