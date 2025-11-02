-- ============================================
-- FIX ADMIN LOGIN - FINAL SOLUTION
-- Password: admin123
-- Hash: $2b$10$DyvwfeoGmmnaTuIFKZZu9Ovs0NMuF.U33.vgd7xNIQdzZEvnP8eBe
-- ============================================

-- Step 1: Hapus user admin yang lama (kalau ada)
DELETE FROM "users" WHERE "email" = 'admin@gereja.com';

-- Step 2: Buat user admin baru dengan password hash yang FRESH
INSERT INTO "users" (id, name, email, password, role, "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::TEXT,
    'Administrator',
    'admin@gereja.com',
    '$2b$10$DyvwfeoGmmnaTuIFKZZu9Ovs0NMuF.U33.vgd7xNIQdzZEvnP8eBe',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Step 3: Verify
SELECT id, name, email, role, 
       substring(password, 1, 30) || '...' as password_preview,
       "createdAt"
FROM "users" 
WHERE "email" = 'admin@gereja.com';
